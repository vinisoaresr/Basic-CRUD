import { type EmployeeModel } from '../models/employee-model'

export interface EditEmployee {
  edit: (employee: EditEmployeeModel) => Promise<EmployeeModel>
}

export interface EditEmployeeModel {
  id: string
  firstName: string
  lastName: string
  email: string
  NISNumber: number
}
