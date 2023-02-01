import { type FindEmployeeById } from '../../../domain/useCases/find-employee-by-id'
import { MissingParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers/http-helpers'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'

export class FindEmployeeByIdController implements Controller {
  private readonly findEmployee: FindEmployeeById

  constructor (findEmployee: FindEmployeeById) {
    this.findEmployee = findEmployee
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      if (!id) {
        return badRequest(new MissingParamError('id'))
      }
      const employee = await this.findEmployee.find(id)
      return success(employee)
    } catch (error) {
      return serverError(error)
    }
  }
}
