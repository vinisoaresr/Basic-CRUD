import { FindEmployeeById } from "../../../domain/useCases/findEmployeeById";
import { MissingParamError } from "../../errors";
import { badRequest, serverError, success } from "../../helpers/http-helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";


export class FindEmployeeByIdController implements Controller {
  private readonly findEmployee: FindEmployeeById

  constructor(findEmployee: FindEmployeeById) {
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
