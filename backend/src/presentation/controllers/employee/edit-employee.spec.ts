import { EditEmployee } from '../../../domain/useCases/edit-employee'
import { InvalidParamError, MissingParamError } from '../../errors'
import { serverError } from '../../helpers/http-helpers'
import { EmailValidator, NumberValidator, TextLengthValidator } from '../../protocols'
import { EditEmployeeController } from './edit-employee'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeEditEmployeeStub = (): EditEmployee => {
  class EditEmployeeSub implements EditEmployee {
    edit (values: any): any {
      return values
    }
  }
  return new EditEmployeeSub()
}
const makeTextValidator = (): TextLengthValidator => {
  class TextValidatorMock implements TextLengthValidator {
    isValid (text: string, minLength: any, maxLength: any): boolean {
      return true
    }
  }
  return new TextValidatorMock()
}
const makeNumberValidator = (): NumberValidator => {
  class NumberValidatorMock implements NumberValidator {
    isValid (value: any): boolean {
      return true
    }
  }
  return new NumberValidatorMock()
}

const makeSut = (): any => {
  const editEmployee = makeEditEmployeeStub()
  const emailValidatorStub = makeEmailValidator()
  const numberValidator = makeNumberValidator()
  const textValidator = makeTextValidator()
  const sut = new EditEmployeeController(
    textValidator,
    emailValidatorStub,
    numberValidator,
    editEmployee)
  return { sut, textValidator, emailValidatorStub, numberValidator, editEmployee }
}

describe('editEmployee Test', () => {
  test('Should return 400 if no firstName is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'valid_id',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: '12345'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('firstName'))
    expect(httpResponse.statusCode).toBe(400)
  })
  // test('Should return 400 if no LastName is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.body).toEqual(new MissingParamError('lastName'))
  //   expect(httpResponse.statusCode).toBe(400)
  // })
  // test('Should return 400 if no email is provided', async () => {
  //   const { sut, textValidator } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       NISNumber: '12345'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.body).toEqual(new MissingParamError('email'))
  //   expect(httpResponse.statusCode).toBe(400)
  // })
  // test('Should return 400 if no NISNumber is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.body).toEqual(new MissingParamError('NISNumber'))
  //   expect(httpResponse.statusCode).toBe(400)
  // })
  // test('Should return 500 if textValidation throws error', async () => {
  //   const { sut, textValidator } = makeSut()
  //   jest.spyOn(textValidator, 'isValid').mockImplementationOnce(() => {
  //     throw new Error()
  //   })
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse).toEqual(serverError(new Error()))
  //   expect(httpResponse.statusCode).toBe(500)
  // })
  // test('Should return 400 if an invalid input text is provided to textLengthValidator', async () => {
  //   const { sut, textValidator } = makeSut()
  //   let isValidSpy = jest.spyOn(textValidator, 'isValid').mockReturnValueOnce(true).mockReturnValueOnce(false)
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   let httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toEqual(new InvalidParamError('lastName'))
  //   expect(isValidSpy).toBeCalledTimes(2)
  //   isValidSpy = jest.spyOn(textValidator, 'isValid').mockReturnValueOnce(false)
  //   httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toEqual(new InvalidParamError('firstName'))
  //   expect(isValidSpy).toBeCalledTimes(3)
  // })
  // test('Should call TextLengthValidator with correct value', async () => {
  //   const { sut, textValidator } = makeSut()
  //   const isValidSpy = jest.spyOn(textValidator, 'isValid')
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   await sut.handle(httpRequest)
  //   expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.firstName, 2, 30)
  //   expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.lastName, 2, 50)
  //   expect(isValidSpy).toBeCalledTimes(2)
  // })
  // test('Should return 400 if an invalid email is provided', async () => {
  //   const { sut, emailValidatorStub } = makeSut()
  //   jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  // })
  // test('Should call EmailValidator with correct email', async () => {
  //   const { sut, emailValidatorStub } = makeSut()
  //   const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   await sut.handle(httpRequest)
  //   expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  // })
  // test('Should return 500 if EmailValidator throws', async () => {
  //   const { sut, emailValidatorStub } = makeSut()
  //   jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
  //     throw new Error()
  //   })
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(500)
  //   expect(httpResponse).toEqual(serverError(new Error()))
  // })
  // test('Should call editEmployee with correct values', async () => {
  //   const { sut, editEmployee } = makeSut()
  //   const addSpy = jest.spyOn(editEmployee, 'edit')
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   await sut.handle(httpRequest)
  //   expect(addSpy).toHaveBeenCalledTimes(1)
  //   expect(addSpy).toHaveBeenCalledWith({
  //     firstName: 'valid_firstName',
  //     lastName: 'valid_lastName',
  //     email: 'valid@email.com',
  //     NISNumber: '12345'
  //   })
  // })
  // test('Should return 500 if editEmployee throws', async () => {
  //   const { sut, editEmployee } = makeSut()
  //   jest.spyOn(editEmployee, 'edit').mockImplementationOnce(async () => {
  //     return await new Promise((resolve, reject) => { reject(new Error()) })
  //   })
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: '12345'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(500)
  //   expect(httpResponse).toEqual(serverError(new Error()))
  // })
  // test('Should return 200 if valid values is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       firstName: 'valid_firstName',
  //       lastName: 'valid_lastName',
  //       email: 'valid@email.com',
  //       NISNumber: 12345
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(200)
  //   expect(httpResponse.body).toEqual({
  //     firstName: 'valid_firstName',
  //     lastName: 'valid_lastName',
  //     email: 'valid@email.com',
  //     NISNumber: 12345
  //   })
  // })
})
