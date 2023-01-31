import { EmployeeModel } from "../models/employee-model"

export interface AddEmployee {
  add: (employee: AddEmployeeModel) => Promise<EmployeeModel>
}

interface AddEmployeeModel {
  firstName: string
  lastName: string
  email: string
  NISNumber: number
}
