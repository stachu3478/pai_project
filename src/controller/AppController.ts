import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";

export default class AppController {
  protected request: Request
  protected response: Response
  protected next: NextFunction

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request
    this.response = response
    this.next = next
  }

  beforeAction() {
    this.response.clearCookie('notice')
    this.response.clearCookie('error')
  }

  async validate(record: any) {
    this.session.errors = await validate(record)
  }

  get errors() {
    return this.session.errors
  }

  get postParams() {
    const postParams = this.session.postParams
    this.session.postParams = []
    return postParams
  }

  get session() {
    return this.request.session as any
  }
}