import * as _ from 'lodash'
import { Repository } from "typeorm";

export default abstract class AppEntity<T> {
  abstract repository: Repository<AppEntity<T>>

  constructor(hash: Record<keyof T, any>) {
    Object.assign(this, hash)
  }

  save() {
    this.repository.save(this)
  }
}