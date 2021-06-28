import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'LaterThan' })
export class LaterThan implements ValidatorConstraintInterface {
  validate(date: Date, validationArguments: ValidationArguments) {
    const fieldName = validationArguments.constraints[0]
    const fieldValue = validationArguments.object[fieldName]
    return date > fieldValue
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    const fieldName = validationArguments.constraints[0]
    return `date for $property must be later than date of ${fieldName}`;
  }
}