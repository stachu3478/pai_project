import * as _ from 'lodash'
import {getRepository} from "typeorm";
import AppController from './AppController';
import { Tournament } from '../entity/Tournament';

// TODO policy
export class UserController extends AppController {
    private tournamentRepository = getRepository(Tournament);

    async index() {
        this.response.render('users/index', {
            notice: this.request.cookies.notice,
            tournaments: await this.tournamentRepository.find()
        })
    }

    async new() {
        const user = this.tournamentRepository.create(this.session.takeCache('lastParams', {}))
        this.response.render('users/new', { errors: this.session.takeCache('errors', {}), user })
    }

    async create() {
        const params = this.tournamentParams
        const tournament = this.tournamentRepository.create(params)
        tournament.author = this.session.user
        const errors = await this.validate(tournament)
        if (errors.length) {
            this.session.putCache('lastParams', params)
            this.response.redirect('users/new')
        } else {
            await this.tournamentRepository.insert(tournament)
            this.response.cookie('notice', 'User saved successfully')
            this.response.redirect('users')
        }
    }

    private get tournamentParams() {
        return _.pick(this.request.body, ['name', 'subject', 'startTime', 'maxApplications', 'applicationDeadline']) 
    }
}