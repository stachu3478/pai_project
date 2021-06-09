import * as _ from 'lodash'
import {getRepository, DeepPartial} from "typeorm";
import AppController from './AppController';
import { Tournament } from '../entity/Tournament';

// TODO policy
export class TournamentController extends AppController {
    private tournamentRepository = getRepository(Tournament);
    tournaments: Tournament[] = []
    tournament: Tournament
    errors: any

    async index() {
        const id = this.request.query.id
        if (id && typeof id === 'string') return this.show(parseInt(id))
        this.tournaments = await this.tournamentRepository.find()
        this.render('tournaments/index')
    }

    async show(id: number) {
        this.tournament = await this.tournamentRepository.findOne({ id }, { loadRelationIds: true })
        this.render('tournaments/show')
    }

    async new() {
        this.tournament = this.tournamentRepository.create(this.session.takeCache('lastParams', {}) as DeepPartial<Tournament>)
        this.errors = this.session.takeCache('errors', {})
        this.render('tournaments/new')
    }

    async create() {
        const params = this.tournamentParams
        const tournament = this.tournamentRepository.create(params)
        tournament.author = this.session.user
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

    private get tournamentParams() {
        return _.pick(this.request.body, ['name', 'subject', 'startTime', 'maxApplications', 'applicationDeadline']) 
    }
}