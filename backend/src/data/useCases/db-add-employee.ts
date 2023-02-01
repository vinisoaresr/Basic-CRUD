import { type EmployeeModel } from '../../domain/models/employee-model'
import { type AddEmployee, type AddEmployeeModel } from '../../domain/useCases/add-employee'
import { type AddEmployeeRepository } from '../protocols/add-employee-repository'

export class DbAddEmployeeImpl implements AddEmployee {
  private readonly repository: AddEmployeeRepository

  constructor (repository: AddEmployeeRepository) {
    this.repository = repository
  }

  async add (employeeData: AddEmployeeModel): Promise<EmployeeModel> {
    const employee = await this.repository.add(employeeData)
    return await new Promise(resolve => { resolve(employee) })
  }
}
