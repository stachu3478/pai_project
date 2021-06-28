import { User } from "../entity/User";
import Mailer from "./mailer";
import { resolve } from "path";

export default class RecoveryMailer {
  send(user: User) {
    return Mailer.get().send({
      to: user.email,
      subject: 'App - recover your account',
      template: resolve(__dirname, '../view/mailer/recover.pug'),
      locals: {
        activationUrl: user.activationUrl
      }
    })
  }
}