import { EmployeeModel } from "../../domain/models/employee-model"
import { AddEmployeeModel } from "../../domain/useCases/addEmployee"
import { AddEmployeeRepository } from "../protocols/addEmployeeRepository"
import { DbAddEmployeeImpl } from "./db-add-employee"


interface sutTypes {
  sut: DbAddEmployeeImpl
  addEmployeeRepository: AddEmployeeRepository
}

const makeAddEmployeeRepository = (): AddEmployeeRepository => {
  class addEmployeeRepositoryStub implements AddEmployeeRepository {
    async add (account: AddEmployeeModel): Promise<EmployeeModel> {
      const fakeAccount = {
        id: 'valid_id',
        firstName: 'valid_name',
        lastName: 'valid_name',
        email: 'valid_email',
        NISNumber: 12345
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new addEmployeeRepositoryStub()
}

const makeSut = (): sutTypes => {
  const addEmployeeRepository = makeAddEmployeeRepository()
  const sut = new DbAddEmployeeImpl(addEmployeeRepository)
  return { sut, addEmployeeRepository }
}

describe('DbAddEmployee UseCase', () => {
  test('Should call addEmployeeRepository with correct values', async () => {
    const { sut, addEmployeeRepository } = makeSut()
    const addSpy = jest.spyOn(addEmployeeRepository, 'add')
    const accountData = {
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    })
  })
  test('Should throw if addEmployeeRepository throws', async () => {
    const { sut, addEmployeeRepository } = makeSut()
    jest.spyOn(addEmployeeRepository, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    }
    const account = await sut.add(accountData)
    await expect(account).toEqual({
      id: 'valid_id',
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    })
  })
})
