import { EmployeeModel } from "../../../domain/models/employee-model"
import { EditEmployee, EditEmployeeModel } from "../../../domain/useCases/Edit-employee"
import { BusinessError } from "../../../presentation/errors/business.error"
import { EditEmployeeRepository, CheckEmployeeRepository } from "../../protocols"

export class DbEditEmployeeImpl implements EditEmployee {
  private readonly repository: EditEmployeeRepository
  private readonly checkEmployeeRepository: CheckEmployeeRepository

  constructor(repository: EditEmployeeRepository, checkEmployeeRepository: CheckEmployeeRepository) {
    this.repository = repository
    this.checkEmployeeRepository = checkEmployeeRepository
  }

  async edit (employeeData: EditEmployeeModel): Promise<EmployeeModel> {
    const hasValidEmployee = await this.checkEmployeeRepository.check(employeeData.id)
    if (hasValidEmployee) {
      const employee = await this.repository.edit(employeeData)
      return await new Promise(resolve => { resolve(employee) })
    } else {
      return await new Promise((resolve, reject) => {
        reject(new BusinessError('invalid ID is provided'))
      })
    }
  }
}
