import { EmployeeModel } from "../../../domain/models/employee-model"
import { EditEmployeeModel } from "../../../domain/useCases/Edit-employee"
import { EditEmployeeRepository, CheckEmployeeRepository } from "../../protocols"
import { DbEditEmployeeImpl } from "./db-edit-employee"


interface sutTypes {
  sut: DbEditEmployeeImpl
  editEmployeeRepository: EditEmployeeRepository
  checkEmployeeRepository: CheckEmployeeRepository
}

const makeEditEmployeeRepository = (): EditEmployeeRepository => {
  class EditEmployeeRepositoryStub implements EditEmployeeRepository {
    async edit (account: EditEmployeeModel): Promise<EmployeeModel> {
      const fakeAccount = {
        id: 'valid_id',
        firstName: 'valid_name',
        lastName: 'valid_name',
        email: 'valid_email',
        NISNumber: 12345
      }
      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }
  return new EditEmployeeRepositoryStub()
}
const makeCheckEmployeeRepository = (): CheckEmployeeRepository => {
  class CheckEmployeeRepositoryStub implements CheckEmployeeRepository {
    async check (id: string): Promise<boolean> {
      return true
    }
  }
  return new CheckEmployeeRepositoryStub()
}

const makeSut = (): sutTypes => {
  const checkEmployeeRepository = makeCheckEmployeeRepository()
  const editEmployeeRepository = makeEditEmployeeRepository()
  const sut = new DbEditEmployeeImpl(editEmployeeRepository, checkEmployeeRepository)
  return { sut, editEmployeeRepository, checkEmployeeRepository }
}

describe('DbEditEmployee UseCase', () => {
  test('Should call EditEmployeeRepository with correct values', async () => {
    const { sut, editEmployeeRepository } = makeSut()
    const EditSpy = jest.spyOn(editEmployeeRepository, 'edit')
    const accountData = {
      id: 'valid_id',
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    }
    await sut.edit(accountData)
    expect(EditSpy).toHaveBeenCalledWith(accountData)
  })
  // test('Should throw if EditEmployeeRepository throws', async () => {
  //   const { sut, editEmployeeRepository } = makeSut()
  //   jest.spyOn(editEmployeeRepository, 'edit').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
  //   const accountData = {
  //     id: 'valid_id',
  //     firstName: 'valid_name',
  //     lastName: 'valid_name',
  //     email: 'valid_email',
  //     NISNumber: 12345
  //   }
  //   const promise = sut.edit(accountData)
  //   await expect(promise).rejects.toThrow()
  // })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      id: 'valid_id',
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    }
    const account = await sut.edit(accountData)
    await expect(account).toEqual({
      id: 'valid_id',
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email',
      NISNumber: 12345
    })
  })
})
