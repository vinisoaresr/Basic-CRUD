import { type EmployeeModel } from '../../domain/models/employee-model'
import { type AddEmployeeModel } from '../../domain/useCases/add-employee'

export interface AddEmployeeRepository {
  add: (employeeData: AddEmployeeModel) => Promise<EmployeeModel>
}
