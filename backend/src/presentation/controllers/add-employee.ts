
export class AddEmployeeController {
  handle (httpRequest): any {
    const { firstName, lastName, email, NISNumber } = httpRequest.body
    if (!firstName) {
      return {
        statusCode: 400
      }
    }

    if (!lastName) {
      return {
        statusCode: 400
      }
    }

    if (!email) {
      return {
        statusCode: 400
      }
    }

    if (!NISNumber) {
      return {
        statusCode: 400
      }
    }

  }
}

