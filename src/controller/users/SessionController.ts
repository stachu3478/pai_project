import * as _ from 'lodash'
import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import AppController from '../AppController';

export class SessionController extends AppController {
    private userRepository = getRepository(User);

    async new() {
      const lastParams = this.session.takeCache('lastParams', {})
      this.render('users/sessions/new', { error: this.request.cookies.error, params: lastParams })
    }

    async create() {
      const params = this.loginParams
      const user = await this.userRepository.findOne({ email: params.email })
      if (user.passwordMathes(params.password)) {
        this.session.user = user
        this.response.cookie('notice', 'You have been logged in successfully')
        this.redirect('../tournaments')
      } else {
        this.session.putCache('lastParams', params)
        this.response.cookie('error', 'Invalid email or password')
        this.redirect('sessions/new')
      }
    }

    private get loginParams() {
        return _.pick(this.request.body, ['email', 'password']) 
    }
}