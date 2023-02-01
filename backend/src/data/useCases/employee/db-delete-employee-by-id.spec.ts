import { type DeleteEmployeeByIdRepository } from '../../protocols/delete-employee-repository'
import { DbRemoveEmployeeById } from './db-delete-employee-by-id'

const makeRepository = () => {
  class DeleteEmployeeByIdRepoStub implements DeleteEmployeeByIdRepository {
    async delete (id: string): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }
  return new DeleteEmployeeByIdRepoStub()
}

const makeSut = () => {
  const deleteEmployeeByIdRepository = makeRepository()
  const sut = new DbRemoveEmployeeById(deleteEmployeeByIdRepository)
  return { sut, deleteEmployeeByIdRepository }
}

describe('DbDeleteEmployeeById UseCase', () => {
  test('Should call DeleteEmployeeByIdRepository with correct values', async () => {
    const { sut, deleteEmployeeByIdRepository } = makeSut()
    const DeleteSpy = jest.spyOn(deleteEmployeeByIdRepository, 'delete')
    await sut.delete('valid_id')
    expect(DeleteSpy).toHaveBeenCalledWith('valid_id')
    expect(DeleteSpy).toHaveBeenCalledTimes(1)
  })
  test('Should throw if deleteEmployeeByIdRepository throws', async () => {
    const { sut, deleteEmployeeByIdRepository } = makeSut()
    jest.spyOn(deleteEmployeeByIdRepository, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.delete('valid_id')
    await expect(promise).rejects.toThrow()

    await expect(promise).rejects.toThrow()
  })
  test('Should return an true on success', async () => {
    const { sut } = makeSut()
    const employee = await sut.delete('valid_id')
    expect(employee).toEqual(true)
  })
})
