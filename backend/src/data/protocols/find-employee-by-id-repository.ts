import { EmployeeModel } from "../../domain/models/employee-model";

export interface findEmployeeByIdRepository {
  find (id: string): Promise<EmployeeModel>
}
