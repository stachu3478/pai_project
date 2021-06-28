import * as _ from 'lodash'
import { getRepository, getConnection } from "typeorm";
import { User } from "../../entity/User";
import AppController from "../AppController";
import RecoveryMailer from '../../mailer/RecoveryMailer';

export default class PasswordRecoveryController extends AppController {
  private userRepository = getRepository(User);
  params: any = {}

  async new() {
    this.params = this.session.takeCache('lastParams', {})
    this.render('users/passwordRecovery/new')
  }

  async create() {
    const params = this.recoveryParams
    const user = await this.userRepository.findOne(_.merge({ active: true }, params) )
    this.response.cookie('notice', 'If that email exists in email database, you will receive an recovery link on addess provided.')
    if (user) {
      user.rotateActivationCode()
      await getConnection().transaction(async transactionalEntityManager => {
          await transactionalEntityManager.save(user)
          await new RecoveryMailer().send(user)
      })
    }
    this.redirect('sessions/new')
  }

  private get recoveryParams() {
    return _.pick(this.request.body, ['email']) 
  }
}