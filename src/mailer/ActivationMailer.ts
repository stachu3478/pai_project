import { User } from "../entity/User";
import Mailer from "./mailer";

export default class ActivationMailer {
  send(user: User) {
    Mailer.get().send({
      to: user.email,
      subject: 'App - activate your account',
      template: './view/mailer/activate',
      locals: {
        email: user.email,
        activationCode: user.activationCode
      }
    })
  }
}