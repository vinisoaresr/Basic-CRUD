
export class AddEmployeeController {
  handle (httpRequest): any {
    const { firstName, lastName, email, NISNumber } = httpRequest.body
    if (!firstName) {
      return {
        statusCode: 400
      }
    }
  }
}

