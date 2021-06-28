import * as _ from 'lodash'
import * as pug from 'pug'
import * as nodemailer from 'nodemailer'

interface MailerOptions {
  to: string,
  subject: string,
  template: string,
  locals: Object
}

const mailer = _.memoize(() => new Mailer())
export default class Mailer {
  private currentTransporter: any

  async send(opts: MailerOptions) {
    const renderedTemplate = pug.renderFile(opts.template, opts.locals)
    const info = await this.transporter.sendMail({
      from: process.env.MAILER_LOGIN, // sender address
      to: opts.to, // list of receivers
      subject: opts.subject, // Subject line
      html: renderedTemplate, // html body
    });
  }

  static get() {
    return mailer()
  }

  private get transporter() {
    if (!this.currentTransporter) {
      this.currentTransporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAILER_LOGIN,
          pass: process.env.MAILER_PASS,
        },
        ignoreTLS: true
      });
    }
    return this.currentTransporter
  }
}