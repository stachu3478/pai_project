import * as _ from 'lodash'
import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import SessionWrapper from "../utils/SessionWrapper";
import { User } from "../entity/User";

export default class AppController {
  public currentUser?: User | false
  protected request: Request
  protected response: Response
  protected next: NextFunction
  protected session: SessionWrapper
  private shouldRender = true
  errors: ValidationError[] = []
  _ = _
  googleApiKey = process.env.GOOGLE_API_KEY

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request
    this.response = response
    this.next = next
    this.session = new SessionWrapper(request)
  }

  async beforeAction() {
    this.response.clearCookie('notice')
    this.response.clearCookie('error')
    this.errors = this.session.takeCache('errors', {})
    this.currentUser = await this.session.getUser()
  }

  afterAction(path: string) {
    if (this.shouldRender) this.render(path)
  }

  redirect(url: string) {
    this.shouldRender = false
    this.response.redirect(url)
  }

  render(view: string, locals: Object = this) {
    this.shouldRender = false
    this.response.render(view, locals)
  }

  async validate(record: any) {
    return this.session.putCache('errors', await validate(record))
  }

  get notice() {
    return this.request.cookies.notice
  }

  get error() {
    return this.request.cookies.error
  }
}