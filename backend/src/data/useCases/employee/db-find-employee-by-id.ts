import { type EmployeeModel } from '../../../domain/models/employee-model'
import { type FindEmployeeById } from '../../../domain/useCases/find-employee-by-id'
import { type findEmployeeByIdRepository } from '../../protocols/find-employee-by-id-repository'

export class DbFindEmployeeById implements FindEmployeeById {
  private readonly findEmployeeByIdRepository: findEmployeeByIdRepository

  constructor (findEmployeeByIdRepository: findEmployeeByIdRepository) {
    this.findEmployeeByIdRepository = findEmployeeByIdRepository
  }

  async find (id: string): Promise<EmployeeModel> {
    const employee = await this.findEmployeeByIdRepository.find(id)
    return await new Promise(resolve => { resolve(employee) })
  }
}
