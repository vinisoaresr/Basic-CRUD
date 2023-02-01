import { FindEmployeeById } from "../../../domain/useCases/find-employee-by-id";
import { RemoveEmployee } from "../../../domain/useCases/remove-employee";
import { DeleteEmployeeByIdRepository } from "../../protocols/delete-employee-repository";

export class DbRemoveEmployeeById implements RemoveEmployee {
  private readonly deleteEmployeeByIdRepository: DeleteEmployeeByIdRepository

  constructor(deleteEmployeeByIdRepository: DeleteEmployeeByIdRepository) {
    this.deleteEmployeeByIdRepository = deleteEmployeeByIdRepository
  }


  async delete (id: string): Promise<Boolean> {
    const result = await this.deleteEmployeeByIdRepository.delete(id)
    return new Promise(resolve => resolve(result))
  }
}
