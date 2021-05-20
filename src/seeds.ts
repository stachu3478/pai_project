import { Connection } from "typeorm";
import { User } from "./entity/User";

export default async function seeds(connection: Connection) {
  connection.manager.save(connection.manager.create(User, {
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
  }));
}