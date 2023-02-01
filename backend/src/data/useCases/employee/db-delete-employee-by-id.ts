import { FindEmployeeById } from '../../../domain/useCases/find-employee-by-id'
import { type RemoveEmployee } from '../../../domain/useCases/remove-employee'
import { type DeleteEmployeeByIdRepository } from '../../protocols/delete-employee-repository'

export class DbRemoveEmployeeById implements RemoveEmployee {
  private readonly deleteEmployeeByIdRepository: DeleteEmployeeByIdRepository

  constructor (deleteEmployeeByIdRepository: DeleteEmployeeByIdRepository) {
    this.deleteEmployeeByIdRepository = deleteEmployeeByIdRepository
  }

  async delete (id: string): Promise<boolean> {
    const result = await this.deleteEmployeeByIdRepository.delete(id)
    return await new Promise(resolve => { resolve(result) })
  }
}
