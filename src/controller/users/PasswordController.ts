import * as _ from 'lodash'
import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import AppController from '../AppController';

export class PasswordController extends AppController {
    private userRepository = getRepository(User);
    params: any = {}

    async new() {
      const { activationCode } = this.request.query
      const user = await this.userRepository.findOne({ activationCode: activationCode.toString() })
      if (user) {
        this.params = this.session.takeCache('lastParams', this.request.query)
        this.render('users/passwords/new')
      } else {
        this.response.cookie('error', 'This activation code is not valid. Please check its correction.')
        this.redirect('../sessions/new')
      }
    }

    async create() {
      const params = this.activationParams
      const user = await this.userRepository.findOne(_.pick(params, ['activationCode']))
      if (user) {
        user.active = true
        user.password = params.password
        await this.userRepository.save(user)
        this.session.user = user
        this.response.cookie('notice', 'Your account has been activated successfully. You are now logged in.')
        this.redirect('../tournaments')
      } else {
        this.session.putCache('lastParams', params)
        this.response.cookie('error', 'Invalid email or password')
        this.redirect('../sessions/new')
      }
    }

    private get activationParams() {
      return _.pick(this.request.body, ['activationCode', 'password']) 
    }
}