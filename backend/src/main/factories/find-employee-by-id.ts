import { DbFindEmployeeById } from '../../data/useCases/employee/db-find-employee-by-id'
import { EmployeeMongoRepository } from '../../infra/db/mongodb/employee-repository/employee'
import { FindEmployeeByIdController } from '../../presentation/controllers/employee/find-employee-by-id'
import { type Controller } from '../../presentation/protocols'

export const makeFindEmployeeByIdController = (): Controller => {
  const employeeMongoRepo = new EmployeeMongoRepository()
  const dbFindEmployeeImpl = new DbFindEmployeeById(employeeMongoRepo)
  const controller = new FindEmployeeByIdController(dbFindEmployeeImpl)
  return controller
}
