import { AddEmployeeController } from "./add-employee"


describe('AddEmployee Test', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new AddEmployeeController()
    const httpRequest = {
      body: {
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })



  // - first name (Entre 2 e 30 char)
  // - last name (Entre 2 e 50 char)
  // - e-mail (validate e-mail)
  // - number do NIS (PIS) (validate if number)
})
