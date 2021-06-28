import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'LaterThanNow' })
export class LaterThanNow implements ValidatorConstraintInterface {
  validate(date: string) {
    return new Date(date) > (new Date())
  }

  defaultMessage() {
    return `date for $property must be in the future`;
  }
}