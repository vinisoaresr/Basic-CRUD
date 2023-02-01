import { type EmployeeModel } from '../models/employee-model'

export interface FindEmployeeById {
  find: (id: string) => Promise<EmployeeModel>
}
