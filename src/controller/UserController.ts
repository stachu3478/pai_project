import * as _ from 'lodash'
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import { validate } from "class-validator";
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
        const user = this.userRepository.create()
        this.response.render('users/new', { ...this.request.cookies, user })
    }

    async create() {
        const user = this.userRepository.create(this.userParams)
        const errors = await validate(user)
        if (errors.length) {
            this.response.status(422).redirect('users/new', )
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