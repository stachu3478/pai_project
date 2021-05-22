import * as _ from 'lodash'
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import AppController from './AppController';

export class UserController extends AppController {
    private userRepository = getRepository(User);

    async index() {
        this.response.render('users/index', {
            notice: this.request.cookies.notice,
            users: await this.userRepository.find()
        })
    }

    async new() {
        const user = this.userRepository.create(this.postParams)
        this.response.render('users/new', { errors: this.errors, user })
    }

    async create() {
        const params = this.userParams
        const user = this.userRepository.create(params)
        await this.validate(user)
        if (this.errors.length) {
            this.session.errors = this.errors
            this.session.postParams = params
            this.response.redirect('users/new')
        } else {
            await this.userRepository.insert(user)
            this.response.cookie('notice', 'User saved successfully')
            this.response.redirect('users')
        }
    }

    private get userParams() {
        return _.pick(this.request.body, ['firstName', 'lastName', 'email']) 
    }
}