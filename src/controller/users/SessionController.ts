import * as _ from 'lodash'
import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import AppController from '../AppController';

export class SessionController extends AppController {
    private userRepository = getRepository(User);
    params: any = {}

    async new() {
      if (this.currentUser) {
        this.response.cookie('notice', 'You are already logged in')
        this.redirect('../../tournaments')
      } else {
        this.params = this.session.takeCache('lastParams', {})
        this.render('users/sessions/new')
      }
    }

    async create() {
      const params = this.loginParams
      const user = await this.userRepository.findOne({ email: params.email })
      if (user && user.passwordMathes(params.password)) {
        this.session.user = user
        this.response.cookie('notice', 'You have been logged in successfully')
        this.redirect('../../tournaments')
      } else {
        this.session.putCache('lastParams', params)
        this.response.cookie('error', 'Invalid email or password')
        this.redirect('sessions/new')
      }
    }

    async destroy() {
      if (this.currentUser) {
        this.session.removeUser()
        this.response.cookie('notice', 'You have been logged out successfully')
        this.redirect('../../tournaments')
      } else {
        this.response.cookie('error', 'You need to login to perform this action')
        this.redirect('new')
      }
    }

    private get loginParams() {
      return _.pick(this.request.body, ['email', 'password']) 
    }
}