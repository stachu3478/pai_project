import * as _ from 'lodash'
import { getRepository } from "typeorm";

export default class TypeormAdapter {
  build(Model, props) {
    return getRepository(Model).create(props)
  }

  async save(model, Model) {
    return getRepository(Model).save(model)
  }

  async destroy(model, Model) {
    return getRepository(Model).delete(model)
  }

  async get(model, attr, Model) {
    const all = await getRepository(model.constructor).find()
    const index = _.random(0, all.length)
    return all[index][attr]
  }

  /*set(props, model, Model) {
    return model.set(props)
  }*/
}