import validator from 'validator'
import { NumberValidator } from '../../presentation/protocols'

export class NumberValidatorAdapter implements NumberValidator {
  isValid (value: any): boolean {
    return validator.isInt(value)
  }
}
