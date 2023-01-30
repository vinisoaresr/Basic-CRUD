import { MissingParamError } from "../errors"
import { badRequest } from "../helpers/http-helpers"

export class AddEmployeeController {
  handle (httpRequest): any {
    const { firstName, lastName, email, NISNumber } = httpRequest.body

    const requiredFields = ['firstName', 'lastName', 'email', 'NISNumber']
    for (const field of requiredFields) {
      if (!httpRequest[field]) {
        return badRequest(new MissingParamError(httpRequest[field]))
      }
    }
  }
}

