import { EditEmployee } from '../../../domain/useCases/edit-employee'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, success, serverError } from '../../helpers/http-helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse, NumberValidator, TextLengthValidator } from '../../protocols'

export class EditEmployeeController implements Controller {
  private readonly textLengthValidator: TextLengthValidator
  private readonly emailValidator: EmailValidator
  private readonly numberValidator: NumberValidator
  private readonly editEmployee: EditEmployee

  constructor(
    textLengthValidator: TextLengthValidator,
    emailValidator: EmailValidator,
    numberValidator: NumberValidator,
    editEmployee: EditEmployee) {
    this.textLengthValidator = textLengthValidator
    this.emailValidator = emailValidator
    this.numberValidator = numberValidator
    this.editEmployee = editEmployee
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, firstName, lastName, email, NISNumber } = httpRequest.body
      const requiredFields = ['id', 'firstName', 'lastName', 'email', 'NISNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidFirstName = this.textLengthValidator.isValid(firstName, 2, 30)
      if (!isValidFirstName) {
        return badRequest(new InvalidParamError('firstName'))
      }
      const isValidLastName = this.textLengthValidator.isValid(lastName, 2, 50)
      if (!isValidLastName) {
        return badRequest(new InvalidParamError('lastName'))
      }
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      const isValidNISNumber = this.numberValidator.isValid(NISNumber.toString())
      if (!isValidNISNumber) {
        return badRequest(new InvalidParamError('NISNumber'))
      }
      const employee = await this.editEmployee.edit({
        id,
        firstName,
        lastName,
        email,
        NISNumber
      })
      return success(employee)
    } catch (error) {
      return serverError(error)
    }
  }
}
