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
}