import { MissingParamError } from "../errors"
import { badRequest, serverError } from "../helpers/http-helpers"
import { Controller } from "../protocols/controller"

export class AddEmployeeController implements Controller {
  handle (httpRequest): any {
    try {
      const { firstName, lastName, email, NISNumber } = httpRequest.body
      const requiredFields = ['firstName', 'lastName', 'email', 'NISNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

