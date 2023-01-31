import { InvalidParamError, MissingParamError } from "../errors"
import { badRequest, serverError } from "../helpers/http-helpers"
import { EmailValidator } from "../protocols"
import { Controller } from "../protocols/controller"
import { TextLengthValidator } from "../protocols/text-length-validator"

export class AddEmployeeController implements Controller {

  private readonly firstNameLengthValidator: TextLengthValidator
  private readonly lastNameLengthValidator: TextLengthValidator
  private readonly emailValidator: EmailValidator

  constructor(firstNameLengthValidator: TextLengthValidator, lastNameLengthValidator: TextLengthValidator, emailValidator: EmailValidator) {
    this.firstNameLengthValidator = firstNameLengthValidator
    this.lastNameLengthValidator = lastNameLengthValidator
    this.emailValidator = emailValidator
  }

  handle (httpRequest): any {
    try {
      const { firstName, lastName, email, NISNumber } = httpRequest.body
      const requiredFields = ['firstName', 'lastName', 'email', 'NISNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidFirstName = this.firstNameLengthValidator.isValid(firstName, 2, 30)
      if (!isValidFirstName) {
        return badRequest(new InvalidParamError('firstName'))
      }
      const isValidLastName = this.lastNameLengthValidator.isValid(lastName, 2, 50)
      if (!isValidLastName) {
        return badRequest(new InvalidParamError('lastName'))
      }
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

