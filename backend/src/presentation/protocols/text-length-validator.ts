export interface TextLengthValidator {
  isValid: (text: string, minLength: number, maxLength: number) => boolean
}
