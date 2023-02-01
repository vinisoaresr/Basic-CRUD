import { DbFindAllEmployee } from '../../data/useCases/employee/db-find-all-employee'
import { EmployeeMongoRepository } from '../../infra/db/mongodb/employee-repository/employee'
import { FindAllEmployeeController } from '../../presentation/controllers/employee/find-all-employee'
import { type Controller } from '../../presentation/protocols'

export const makeFindAllEmployeeController = (): Controller => {
  const employeeMongoRepo = new EmployeeMongoRepository()
  const dbFindEmployeeImpl = new DbFindAllEmployee(employeeMongoRepo)
  const controller = new FindAllEmployeeController(dbFindEmployeeImpl)
  return controller
}
