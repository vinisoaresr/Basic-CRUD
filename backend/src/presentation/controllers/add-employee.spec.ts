import { AddEmployee } from "../../domain/useCases/addEmployee"
import { InvalidParamError, MissingParamError, ServerError } from "../errors"
import { serverError } from "../helpers/http-helpers"
import { EmailValidator, TextLengthValidator } from "../protocols"
import { AddEmployeeController } from "./add-employee"

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeAddEmployee = (): AddEmployee => {
  class AddEmployeeSub implements AddEmployee {
    add (values): any {
      return values
    }
  }
  return new AddEmployeeSub()
}

const makeTextValidator = (): TextLengthValidator => {
  class TextValidatorMock implements TextLengthValidator {
    isValid (text: string, minLength: any, maxLength: any): boolean {
      return true
    }
  }
  return new TextValidatorMock()
}

const makeSut = () => {
  const addEmployee = makeAddEmployee()
  const emailValidatorStub = makeEmailValidator()
  const firstNameValidator = makeTextValidator()
  const lastNameValidator = makeTextValidator()
  const sut = new AddEmployeeController(firstNameValidator, lastNameValidator, emailValidatorStub, addEmployee)
  return { sut, firstNameValidator, lastNameValidator, emailValidatorStub, addEmployee }
}

describe('AddEmployee Test', () => {
  test('Should return 400 if no firstName is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('firstName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if no LastName is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('lastName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if no email is provided', async () => {
    const { sut, firstNameValidator } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        NISNumber: '12345'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if no NISNumber is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('NISNumber'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if firsName length is less than 2', async () => {
    const { sut, firstNameValidator } = makeSut()
    const textWithSizeLessThanTwo = '1'
    jest.spyOn(firstNameValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        firstName: textWithSizeLessThanTwo,
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('firstName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if firsName length is bigger than 30', async () => {
    const { sut, firstNameValidator } = makeSut()
    const textWithSizeBiggerThanThirty = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    jest.spyOn(firstNameValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        firstName: textWithSizeBiggerThanThirty,
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('firstName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if lastName length is less than 2', async () => {
    const { sut, lastNameValidator } = makeSut()
    const textWithSizeLessThanTwo = '1'
    jest.spyOn(lastNameValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: textWithSizeLessThanTwo,
        email: 'valid@email.com',
        NISNumber: '12345',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('lastName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if lastName length is bigger than 50', async () => {
    const { sut, lastNameValidator } = makeSut()
    const textWithSizeBiggerThanThirty = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    jest.spyOn(lastNameValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: textWithSizeBiggerThanThirty,
        email: 'valid@email.com',
        NISNumber: '12345',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('lastName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 500 if textValidation throws error', async () => {
    const { sut, firstNameValidator } = makeSut()
    jest.spyOn(firstNameValidator, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = await await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    await await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })
  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = await await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should call addEmployee with correct values', async () => {
    const { sut, addEmployee } = makeSut()
    const addSpy = jest.spyOn(addEmployee, 'add')
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith({
      firstName: 'valid_firstName',
      lastName: 'valid_lastName',
      email: 'valid@email.com',
      NISNumber: '12345'
    })
    //expect(sut).toBe()
  })
  test('Should return 500 if addEmployee throws', async () => {
    const { sut, addEmployee } = makeSut()
    jest.spyOn(addEmployee, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 if valid values is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      firstName: 'valid_firstName',
      lastName: 'valid_lastName',
      email: 'valid@email.com',
      NISNumber: '12345'
    })
  })




  // - first name (Entre 2 e 30 char)
  // - last name (Entre 2 e 50 char)
  // - e-mail (validate e-mail)
  // - number do NIS (PIS) (validate if number)
})
