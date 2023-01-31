import { EmployeeModel } from "../../domain/models/employee-model";
import { AddEmployeeModel } from "../../domain/useCases/addEmployee";

export interface AddEmployeeRepository {
  add (employeeData: AddEmployeeModel): Promise<EmployeeModel>
}
