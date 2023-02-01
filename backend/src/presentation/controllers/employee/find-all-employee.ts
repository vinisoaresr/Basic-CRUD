import { FindAllEmployee } from "../../../domain/useCases/find-all-employee";
import { serverError, success } from "../../helpers/http-helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";


export class FindAllEmployeeController implements Controller {
  private readonly findAllEmployee: FindAllEmployee

  constructor(findAllEmployee: FindAllEmployee) {
    this.findAllEmployee = findAllEmployee
  }

  async handle (_: HttpRequest): Promise<HttpResponse> {
    try {
      const employees = await this.findAllEmployee.find()
      return success(employees)
    } catch (error) {
      return serverError(error)
    }
  }

}
