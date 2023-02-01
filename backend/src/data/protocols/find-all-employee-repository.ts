import { EmployeeModel } from "../../domain/models/employee-model";

export interface FindAllEmployeeRepository {
  findAll (): Promise<EmployeeModel[]>
}
