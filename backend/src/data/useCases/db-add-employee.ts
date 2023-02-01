import { EmployeeModel } from "../../domain/models/employee-model";
import { AddEmployee, AddEmployeeModel } from "../../domain/useCases/add-employee";
import { AddEmployeeRepository } from "../protocols/add-employee-repository";

export class DbAddEmployeeImpl implements AddEmployee {

  private readonly repository: AddEmployeeRepository

  constructor(repository: AddEmployeeRepository) {
    this.repository = repository
  }

  async add (employeeData: AddEmployeeModel): Promise<EmployeeModel> {
    const employee = await this.repository.add(employeeData)
    return new Promise(resolve => resolve(employee))
  }
}
