import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

@ValidatorConstraint({ name: 'UniqueEmail', async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  async validate(email: string) {
    const repo = getRepository(User)
    const usersMatchingEmail = await repo.count({ email })
    return !usersMatchingEmail 
  }

  defaultMessage() {
    return 'Email is already used!';
  }
}