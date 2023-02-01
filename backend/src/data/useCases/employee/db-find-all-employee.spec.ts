import { type EmployeeModel } from '../../../domain/models/employee-model'
import { type FindAllEmployeeRepository } from '../../protocols/find-all-employee-repository'
import { DbFindAllEmployee } from './db-find-all-employee'
import { DbFindEmployeeById } from './db-find-employee-by-id'

const makeRepository = () => {
  class FindAllEmployeeRepositoryStub implements FindAllEmployeeRepository {
    async findAll (): Promise<EmployeeModel[]> {
      return await new Promise(resolve => {
        resolve([
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
    }
  }
  return new FindAllEmployeeRepositoryStub()
}

const makeSut = () => {
  const findAllEmployeeRepositoryStub = makeRepository()
  const sut = new DbFindAllEmployee(findAllEmployeeRepositoryStub)
  return { sut, findAllEmployeeRepositoryStub }
}

describe('DbFindEmployeeById UseCase', () => {
  test('Should call findAllEmployeeRepositoryStub one times', async () => {
    const { sut, findAllEmployeeRepositoryStub } = makeSut()
    const findSpy = jest.spyOn(findAllEmployeeRepositoryStub, 'findAll')
    await sut.find()
    expect(findSpy).toHaveBeenCalledTimes(1)
  })
  test('Should throw if findAllEmployeeRepositoryStub throws', async () => {
    const { sut, findAllEmployeeRepositoryStub } = makeSut()
    jest.spyOn(findAllEmployeeRepositoryStub, 'findAll').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.find()
    await expect(promise).rejects.toThrow()
  })
  test('Should return an employee on success', async () => {
    const { sut } = makeSut()
    const employee = await sut.find()
    expect(employee).toEqual([
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
