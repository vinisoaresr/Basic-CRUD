import validator from 'validator'
import { TextLengthValidator } from '../../presentation/protocols'

export class TextValidatorAdapter implements TextLengthValidator {
  isValid (text: string, minLength: number, maxLength: number): boolean {
    return validator.isLength(text, { min: minLength, max: maxLength })
  }
}
