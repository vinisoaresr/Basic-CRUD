import { randomUUID } from "crypto"
import { InvalidParamError, MissingParamError, ServerError } from "../errors"
import { TextLengthValidator } from "../protocols/textLengthValidator"
import { AddEmployeeController } from "./add-employee"

const makeSut = () => {
  class firstNameValidatorMock implements TextLengthValidator {
    isValid (text: string, minLength: any, maxLength: any): boolean {
      return true
    }
  }
  const firstNameValidator = new firstNameValidatorMock()
  const lastNameValidator = new firstNameValidatorMock()
  const sut = new AddEmployeeController(firstNameValidator, lastNameValidator)
  return { sut, firstNameValidator, lastNameValidator }
}

describe('AddEmployee Test', () => {
  test('Should return 400 if no firstName is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('firstName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if no LastName is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('lastName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if no email is provided', () => {
    const { sut, firstNameValidator } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        NISNumber: '12345'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if no NISNumber is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('NISNumber'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if firsName length is less than 2', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('firstName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if firsName length is bigger than 30', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('firstName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  // 500 if throws
  test('Should return 400 if lastName length is less than 2', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('lastName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if lastName length is bigger than 50', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('lastName'))
    expect(httpResponse.statusCode).toBe(400)
  })




  // - first name (Entre 2 e 30 char)
  // - last name (Entre 2 e 50 char)
  // - e-mail (validate e-mail)
  // - number do NIS (PIS) (validate if number)
})
