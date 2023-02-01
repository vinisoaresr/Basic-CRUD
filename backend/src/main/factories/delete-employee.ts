import { DbRemoveEmployeeById } from '../../data/useCases/employee/db-delete-employee-by-id'
import { EmployeeMongoRepository } from '../../infra/db/mongodb/employee-repository/employee'
import { RemoveEmployeeController } from '../../presentation/controllers/employee/remove-employee'
import { Controller } from '../../presentation/protocols'

export const makeDeleteEmployeeController = (): Controller => {
  const removeEmployeeRepo = new EmployeeMongoRepository()
  const removeEmployee = new DbRemoveEmployeeById(removeEmployeeRepo)
  const controller = new RemoveEmployeeController(removeEmployee)
  return controller
}
