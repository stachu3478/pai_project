import { factory } from 'factory-bot'
import { Connection } from "typeorm";
import './factory/index'

export default async function seeds(connection: Connection) {
  await factory.createMany('user', 10)
  await factory.createMany('tournament', 20)
  //const userAttrs = await factory.build<User>('user')
  //console.log(userAttrs.firstName, userAttrs.lastName, userAttrs.email)
  //connection.manager.save(connection.manager.create(User, userAttrs))
  /*connection.manager.save(connection.manager.create(User, {
    firstName: "Timber",
    lastName: "Saw",
    email: 'test',
    passwordHash: 'hashedpass'
  }));
  connection.manager.save(connection.manager.create(User, {
    firstName: "Phantom",
    lastName: "Assassin",
    email: 'test2',
    passwordHash: 'mypass'
  }));*/
}