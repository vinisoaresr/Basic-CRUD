import { type EmployeeModel } from '../../../domain/models/employee-model'
import { type findEmployeeByIdRepository } from '../../protocols/find-employee-by-id-repository'
import { DbFindEmployeeById } from './db-find-employee-by-id'

const makeRepository = () => {
  class FindEmployeeByIdRepoStub implements findEmployeeByIdRepository {
    async find (id: string): Promise<EmployeeModel> {
      return await new Promise(resolve => {
        resolve({
          id: 'valid_id',
          firstName: 'valid_firstName',
          lastName: 'valid_lastName',
          email: 'valid@email.com',
          NISNumber: 12345
        })
      })
    }
  }
  return new FindEmployeeByIdRepoStub()
}

const makeSut = () => {
  const findEmployeeByIdRepository = makeRepository()
  const sut = new DbFindEmployeeById(findEmployeeByIdRepository)
  return { sut, findEmployeeByIdRepository }
}

describe('DbFindEmployeeById UseCase', () => {
  test('Should call findEmployeeByIdRepository with correct values', async () => {
    const { sut, findEmployeeByIdRepository } = makeSut()
    const findSpy = jest.spyOn(findEmployeeByIdRepository, 'find')
    await sut.find('valid_id')
    expect(findSpy).toHaveBeenCalledWith('valid_id')
    expect(findSpy).toHaveBeenCalledTimes(1)
  })
  test('Should throw if findEmployeeByIdRepository throws', async () => {
    const { sut, findEmployeeByIdRepository } = makeSut()
    jest.spyOn(findEmployeeByIdRepository, 'find').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.find('valid_id')
    await expect(promise).rejects.toThrow()

    await expect(promise).rejects.toThrow()
  })
  test('Should return an employee on success', async () => {
    const { sut } = makeSut()
    const employee = await sut.find('valid_id')
    expect(employee).toEqual({
      id: 'valid_id',
      firstName: 'valid_firstName',
      lastName: 'valid_lastName',
      email: 'valid@email.com',
      NISNumber: 12345
    })
  })
})
