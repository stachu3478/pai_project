import { User } from "../entity/User";
import Mailer from "./mailer";
import { resolve } from "path";

export default class ActivationMailer {
  send(user: User) {
    return Mailer.get().send({
      to: user.email,
      subject: 'App - activate your account',
      template: resolve(__dirname, '../view/mailer/activate.pug'),
      locals: {
        activationUrl: user.activationUrl
      }
    })
  }
}