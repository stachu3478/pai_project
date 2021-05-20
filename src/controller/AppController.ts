import { Request, Response, NextFunction } from "express";

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

  get errors() {
    const errors = this.session.errors
    delete this.session.errors
    return errors
  }

  get postParams() {
    const postParams = this.session.postParams
    delete this.session.postParams
    return postParams
  }

  get session() {
    return this.request.session as any
  }
}