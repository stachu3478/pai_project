import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import SessionWrapper from "../utils/SessionWrapper";

export default class AppController {
  protected request: Request
  protected response: Response
  protected next: NextFunction
  protected session: SessionWrapper

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request
    this.response = response
    this.next = next
    this.session = new SessionWrapper(request)
  }

  beforeAction() {
    this.response.clearCookie('notice')
    this.response.clearCookie('error')
  }

  async validate(record: any) {
    return this.session.putCache('errors', await validate(record))
  }
}