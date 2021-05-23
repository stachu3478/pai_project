import * as _ from 'lodash'
import {getRepository} from "typeorm";
import AppController from './AppController';
import { Tournament } from '../entity/Tournament';

// TODO policy
export class TournamentController extends AppController {
    private tournamentRepository = getRepository(Tournament);

    async index() {
        const id = this.request.query.id
        if (id && typeof id === 'string') return this.show(parseInt(id))
        this.response.render('tournaments/index', {
            notice: this.request.cookies.notice,
            tournaments: await this.tournamentRepository.find()
        })
    }

    async show(id: number) {
        const tournament = await this.tournamentRepository.findOne({ id }, { loadRelationIds: true })
        this.response.render('tournaments/show', {
            notice: this.request.cookies.notice,
            tournament
        })
    }

    async new() {
        const tournament = this.tournamentRepository.create(this.session.takeCache('lastParams', {}))
        this.response.render('tournaments/new', { errors: this.session.takeCache('errors', {}), tournament })
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
            this.response.cookie('notice', 'User saved successfully')
            this.response.redirect('tournaments')
        }
    }

    private get tournamentParams() {
        return _.pick(this.request.body, ['name', 'subject', 'startTime', 'maxApplications', 'applicationDeadline']) 
    }
}