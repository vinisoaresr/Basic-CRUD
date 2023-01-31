import { InvalidParamError, MissingParamError } from "../errors"
import { badRequest, serverError } from "../helpers/http-helpers"
import { Controller } from "../protocols/controller"
import { TextLengthValidator } from "../protocols/textLengthValidator"

export class AddEmployeeController implements Controller {

  private readonly firstNameLengthValidator: TextLengthValidator
  private readonly lastNameLengthValidator: TextLengthValidator

  constructor(firstNameLengthValidator: TextLengthValidator, lastNameLengthValidator: TextLengthValidator) {
    this.firstNameLengthValidator = firstNameLengthValidator
    this.lastNameLengthValidator = lastNameLengthValidator
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

    } catch (error) {
      return serverError(error)
    }
  }
}

