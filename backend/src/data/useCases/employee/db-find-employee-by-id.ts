import { EmployeeModel } from "../../../domain/models/employee-model";
import { FindEmployeeById } from "../../../domain/useCases/findEmployeeById";
import { findEmployeeByIdRepository } from "../../protocols/find-employee-by-id-repository";

export class DbFindEmployeeById implements FindEmployeeById {
  private readonly findEmployeeByIdRepository: findEmployeeByIdRepository

  constructor(findEmployeeByIdRepository: findEmployeeByIdRepository) {
    this.findEmployeeByIdRepository = findEmployeeByIdRepository
  }


  async find (id: string): Promise<EmployeeModel> {
    const employee = await this.findEmployeeByIdRepository.find(id)
    return new Promise(resolve => resolve(employee))
  }
}
