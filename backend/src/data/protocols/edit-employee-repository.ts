import { EmployeeModel } from "../../domain/models/employee-model";
import { EditEmployeeModel } from "../../domain/useCases/Edit-employee";

export interface EditEmployeeRepository {
  edit: (employeeData: EditEmployeeModel) => Promise<EmployeeModel>
}
