import { type EmployeeModel } from '../../../domain/models/employee-model'
import { type FindAllEmployee } from '../../../domain/useCases/find-all-employee'
import { type FindAllEmployeeRepository } from '../../protocols/find-all-employee-repository'

export class DbFindAllEmployee implements FindAllEmployee {
  private readonly findAllEmployeeRepo: FindAllEmployeeRepository

  constructor (findEmployeeByIdRepository: FindAllEmployeeRepository) {
    this.findAllEmployeeRepo = findEmployeeByIdRepository
  }

  async find (): Promise<EmployeeModel[]> {
    const employee = await this.findAllEmployeeRepo.findAll()
    return await new Promise(resolve => { resolve(employee) })
  }
}
