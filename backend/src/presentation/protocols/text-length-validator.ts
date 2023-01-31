export interface TextLengthValidator {
  isValid (text: string, minLength, maxLength): boolean
}
