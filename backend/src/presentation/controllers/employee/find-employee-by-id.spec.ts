import { EmployeeModel } from "../../../domain/models/employee-model"
import { FindEmployeeById } from "../../../domain/useCases/find-employee-by-id"
import { MissingParamError } from "../../errors"
import { serverError } from "../../helpers/http-helpers"
import { FindEmployeeByIdController } from "./find-employee-by-id"

const makeFindEmployeeById = (): FindEmployeeById => {
  class FindEmployeeByIdStub implements FindEmployeeById {
    async find (id: string): Promise<EmployeeModel> {
      return {
        id: 'valid_id',
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: 12345
      }
    };
  }
  return new FindEmployeeByIdStub()
}

const makeSut = () => {
  const findEmployeeById = makeFindEmployeeById()
  const sut = new FindEmployeeByIdController(findEmployeeById)
  return { sut, findEmployeeById }
}

describe('FindAll Employee Controller', () => {
  test('Should return 400 if no param Id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: ''
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('id'))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should call findEmployeeById with correct values', async () => {
    const { sut, findEmployeeById } = makeSut()
    const findSpy = jest.spyOn(findEmployeeById, 'find')
    const httpRequest = {
      params: {
        id: 'valid_id'
      }
    }
    await sut.handle(httpRequest)
    expect(findSpy).toHaveBeenCalledTimes(1)
    expect(findSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })
  test('Should return 500 if findEmployeeById throws', async () => {
    const { sut, findEmployeeById } = makeSut()
    jest.spyOn(findEmployeeById, 'find').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      params: {
        id: 'valid_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 if valid values is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'valid_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      firstName: 'valid_firstName',
      lastName: 'valid_lastName',
      email: 'valid@email.com',
      NISNumber: 12345
    })
  })
})
