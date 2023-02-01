import { RemoveEmployee } from "../../../domain/useCases/remove-employee"
import { MissingParamError } from "../../errors"
import { serverError } from "../../helpers/http-helpers"
import { RemoveEmployeeController } from "./remove-employee"


const makeRemoveEmployee = () => {
  class RemoveEmployeeStub implements RemoveEmployee {
    async delete (id: string): Promise<Boolean> {
      return true
    }
  }
  return new RemoveEmployeeStub()
}

const makeSut = () => {
  const removeEmployeeById = makeRemoveEmployee()
  const sut = new RemoveEmployeeController(removeEmployeeById)
  return { sut, removeEmployeeById }
}

describe('deleteAll Employee Controller', () => {
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
  test('Should call removeEmployeeById with correct values', async () => {
    const { sut, removeEmployeeById } = makeSut()
    const deleteSpy = jest.spyOn(removeEmployeeById, 'delete')
    const httpRequest = {
      params: {
        id: 'valid_id'
      }
    }
    await sut.handle(httpRequest)
    expect(deleteSpy).toHaveBeenCalledTimes(1)
    expect(deleteSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })
  test('Should return 500 if removeEmployeeById throws', async () => {
    const { sut, removeEmployeeById } = makeSut()
    jest.spyOn(removeEmployeeById, 'delete').mockImplementationOnce(async () => {
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
    expect(httpResponse.body).toEqual({ success: true })
  })
})
