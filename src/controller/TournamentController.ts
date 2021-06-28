import * as _ from 'lodash'
import {getRepository, DeepPartial} from "typeorm";
import AppController from './AppController';
import { Tournament } from '../entity/Tournament';
import { Sponsor } from '../entity/Sponsor';

// TODO policy
export class TournamentController extends AppController {
    private tournamentRepository = getRepository(Tournament);
    private sponsorRepository = getRepository(Sponsor);
    sponsors: Sponsor[] = []
    allSponsors: Sponsor[] = []
    tournaments: Tournament[] = []
    tournament: Tournament
    params: any = {}
    perPage = 10
    itemCount: number
    currentPage: number

    async index() {
        const id = parseInt((this.request.query.id || '').toString())
        if (!_.isNaN(id)) return this.show(id)
        this.currentPage = parseInt((this.request.query.page || '').toString()) || 0
        this.tournaments = await this.tournamentRepository.find({ take: this.perPage, skip: this.currentPage * this.perPage })
        this.itemCount = await this.tournamentRepository.count()
        this.render('tournaments/index')
    }

    async show(id: number) {
        await this.fetchTournament(id)
        if (!this.tournament) return
        this.render('tournaments/show')
    }

    async edit() {
        await this.fetchTournament()
        if (!this.tournament) return
        const authorEmail = this.tournament.author.toString()
        if (this.currentUser && this.currentUser.email === authorEmail) {
            this.allSponsors = await this.sponsorRepository.find()
            this.params = this.session.takeCache('lastParams', this.tournament)
            this.render('tournaments/edit')
        } else {
            this.response.cookie('notice', 'Access denied!')
            this.response.redirect(`./?id=${this.tournament.id}`)
        }
    }

    async new() {
        if (!this.currentUser) {
            this.response.cookie('notice', 'Access denied!')
            this.redirect('../')
            return
        }
        this.tournament = this.tournamentRepository.create(this.session.takeCache('lastParams', {}) as DeepPartial<Tournament>)
        this.params = this.tournament
        this.allSponsors = await this.sponsorRepository.find()
        this.render('tournaments/new')
    }

    async update() {
        if (!this.currentUser) {
            this.response.cookie('notice', 'Access denied!')
            this.redirect('../')
            return
        }
        const id = parseInt(this.request.query.id.toString())
        this.tournament = await this.tournamentRepository.findOne({ id }, { loadRelationIds: true })
        const authorEmail = this.tournament.author.toString()
        if (this.currentUser && this.currentUser.email === authorEmail) {
            const params = this.tournamentParams
            params.sponsors = await this.sponsorRepository.findByIds(params.sponsors)
            Object.assign(this.tournament, params)
            const errors = await this.validate(this.tournament)
            if (!this.tournament) {
                this.response.cookie('notice', `Can't find tournament with id ${id}`)
                this.redirect('../')
                return
            }
            if (errors.length) {
                this.session.putCache('lastParams', params)
                this.response.redirect('edit')
            } else {
                await this.tournamentRepository.save(this.tournament)
                this.response.cookie('notice', 'Tournament saved successfully')
                this.response.redirect(`./?id=${id}`)
            }
        } else {
            this.response.cookie('notice', 'Access denied!')
            this.response.redirect(`./?id=${id}`)
        }
    }

    async create() {
        if (!this.currentUser) {
            this.response.cookie('notice', 'Access denied!')
            this.redirect('tournaments/index')
            return
        }
        const params = this.tournamentParams
        params.sponsors = await this.sponsorRepository.findByIds(params.sponsors)
        const tournament = this.tournamentRepository.create(params)
        tournament.author = this.currentUser
        const errors = await this.validate(tournament)
        if (errors.length) {
            this.session.putCache('lastParams', params)
            this.response.redirect('tournaments/new')
        } else {
            await this.tournamentRepository.insert(tournament)
            this.response.cookie('notice', 'Tournament saved successfully')
            this.response.redirect('tournaments')
        }
    }

    private async fetchTournament(id = parseInt(this.request.query.id.toString())) {
        this.tournament = await this.tournamentRepository.findOne({ id }, { loadRelationIds: true })
        if (!this.tournament) {
            this.response.cookie('notice', `Can't find tournament with id ${id}`)
            this.redirect('../')
            return
        }
        this.sponsors = await this.sponsorRepository.findByIds(this.tournament.sponsors)
    }

    private get tournamentParams() {
        const params = _.pick(this.request.body, ['name', 'subject', 'startTime', 'maxApplications', 'applicationDeadline', 'locationLatitude', 'locationLongitude', 'sponsors'])
        params.maxApplications = parseInt(params.maxApplications)
        params.locationLatitude = parseFloat(params.locationLatitude)
        params.locationLongitude = parseFloat(params.locationLongitude)
        params.sponsors = (params.sponsors || []).filter(s => s[1]).map(s => parseInt(s[0]))
        return params
    }
}