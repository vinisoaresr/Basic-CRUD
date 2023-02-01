import { EmployeeModel } from "../../domain/models/employee-model";

export interface findAllEmployeeRepository {
  find (): Promise<EmployeeModel[]>
}
