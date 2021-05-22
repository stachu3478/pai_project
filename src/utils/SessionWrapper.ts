import { Request } from "express";
import { ValidationError } from "class-validator";

export default class SessionWrapper {
  private store: Request['session']
  private cache: { [key: string]: any } = {}
  private static globalCache: { [key: string]: Object } = {}
  
  constructor (request: Request) {
    this.store = request.session
    this.cache = SessionWrapper.globalCache[request.sessionID]
      || (SessionWrapper.globalCache[request.sessionID] = {})
  }

  putCache(key: string, v: any) {
    return this.cache[key] = v
  }

  takeCache(key: string, defaultValue: any = null) {
    const v = this.cache[key]
    delete this.cache[key]
    return v || defaultValue
  }
}