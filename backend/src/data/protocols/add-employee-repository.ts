import { EmployeeModel } from "../../domain/models/employee-model";
import { AddEmployeeModel } from "../../domain/useCases/add-employee";

export interface AddEmployeeRepository {
  add (employeeData: AddEmployeeModel): Promise<EmployeeModel>
}
