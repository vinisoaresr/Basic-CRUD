import { type EmployeeModel } from '../models/employee-model'

export interface FindAllEmployee {
  find: () => Promise<EmployeeModel[]>
}
