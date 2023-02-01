import { EmployeeModel } from "../../domain/models/employee-model";

export interface FindAllEmployeeRepository {
  find (): Promise<EmployeeModel[]>
}
