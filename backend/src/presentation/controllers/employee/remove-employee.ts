import { RemoveEmployee } from "../../../domain/useCases/remove-employee";
import { MissingParamError } from "../../errors";
import { BusinessError } from "../../errors/business.error";
import { badRequest, serverError, success } from "../../helpers/http-helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";


export class RemoveEmployeeController implements Controller {
  private readonly removeEmployee: RemoveEmployee

  constructor(removeEmployee: RemoveEmployee) {
    this.removeEmployee = removeEmployee
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      if (!id) {
        return badRequest(new MissingParamError('id'))
      }
      const removed = await this.removeEmployee.delete(id)
      if (removed) {
        return success({ success: removed })
      } else {
        return badRequest(new BusinessError('Rejected'))
      }
    } catch (error) {
      return serverError(error)
    }
  }

}
