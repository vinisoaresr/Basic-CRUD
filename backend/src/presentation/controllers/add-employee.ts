import { type AddEmployee } from '../../domain/useCases/add-employee'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError, success } from '../helpers/http-helpers'
import { type EmailValidator, type HttpResponse, type NumberValidator, type Controller, type TextLengthValidator, type HttpRequest } from '../protocols'

export class AddEmployeeController implements Controller {
  private readonly textLengthValidator: TextLengthValidator
  private readonly emailValidator: EmailValidator
  private readonly numberValidator: NumberValidator
  private readonly addEmployee: AddEmployee

  constructor (textLengthValidator: TextLengthValidator, emailValidator: EmailValidator, numberValidator: NumberValidator, addEmployee: AddEmployee) {
    this.textLengthValidator = textLengthValidator
    this.emailValidator = emailValidator
    this.numberValidator = numberValidator
    this.addEmployee = addEmployee
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { firstName, lastName, email, NISNumber } = httpRequest.body
      const requiredFields = ['firstName', 'lastName', 'email', 'NISNumber']
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
      const employee = await this.addEmployee.add({
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
