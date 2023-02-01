import { EmployeeModel } from "../../../domain/models/employee-model"
import { FindAllEmployee } from "../../../domain/useCases/find-all-employee"
import { MissingParamError } from "../../errors"
import { serverError } from "../../helpers/http-helpers"
import { FindAllEmployeeController } from "./find-all-employee"

const makeFindAllEmployeeStub = (): FindAllEmployee => {
  class FindAllEmployeeStub implements FindAllEmployee {
    async find (): Promise<EmployeeModel[]> {
      return [
        {
          id: 'valid_id',
          firstName: 'valid_firstName',
          lastName: 'valid_lastName',
          email: 'valid@email.com',
          NISNumber: 12345
        },
        {
          id: 'valid_other_id',
          firstName: 'valid_other_firstName',
          lastName: 'valid_other_lastName',
          email: 'valid_other@email.com',
          NISNumber: 12345
        }
      ]
    };
  }
  return new FindAllEmployeeStub()
}

const makeSut = () => {
  const findAllEmployeeStub = makeFindAllEmployeeStub()
  const sut = new FindAllEmployeeController(findAllEmployeeStub)
  return { sut, findAllEmployeeStub }
}

describe('FindAll Employee Controller', () => {
  test('Should call findEmployeeById one times', async () => {
    const { sut, findAllEmployeeStub } = makeSut()
    const findSpy = jest.spyOn(findAllEmployeeStub, 'find')
    await sut.handle({})
    expect(findSpy).toHaveBeenCalledTimes(1)
  })
  test('Should return 500 if findEmployeeById throws', async () => {
    const { sut, findAllEmployeeStub } = makeSut()
    jest.spyOn(findAllEmployeeStub, 'find').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 if valid values is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        id: 'valid_id',
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@email.com',
        NISNumber: 12345
      },
      {
        id: 'valid_other_id',
        firstName: 'valid_other_firstName',
        lastName: 'valid_other_lastName',
        email: 'valid_other@email.com',
        NISNumber: 12345
      }
    ])
  })
})
