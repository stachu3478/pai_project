import * as _ from 'lodash'
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import AppController from './AppController';
import ActivationMailer from '../mailer/ActivationMailer';

export class UserController extends AppController {
    private userRepository = getRepository(User);

    async new() {
        const user = this.userRepository.create(this.session.takeCache('lastParams', {}))
        this.response.render('users/new', { errors: this.session.takeCache('errors', {}), user })
    }

    async create() {
        const params = this.userParams
        const user = this.userRepository.create(params)
        const errors = await this.validate(user)
        if (errors.length) {
            this.session.putCache('lastParams', params)
            this.response.redirect('users/new')
        } else {
            user.rotateActivationCode()
            await this.userRepository.insert(user)
            new ActivationMailer().send(user)
            this.response.cookie('notice', 'An activation link has been sent to email provided, please follow your mailbox to proceed')
            this.response.redirect('users/sessions/new')
        }
    }

    private get userParams() {
        return _.pick(this.request.body, ['firstName', 'lastName', 'email']) 
    }
}