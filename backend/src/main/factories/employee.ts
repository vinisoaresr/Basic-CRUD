import { Controller } from '../../presentation/protocols'
import { DbAddEmployeeImpl } from '../../data/useCases/db-add-employee'
import { EmployeeMongoRepository } from '../../infra/db/mongodb/employee-repository/employee'
import { AddEmployeeController } from '../../presentation/controllers/add-employee'

export const makeAddEmployeeController = (): Controller => {
  const firstNameLengthValidator = new Object()
  const lastNameLengthValidator = new Object()
  const emailValidator = new Object()
  const dbAddEmployeeRepo = new EmployeeMongoRepository()
  const addEmployee = new DbAddEmployeeImpl(dbAddEmployeeRepo)
  //const LogErrorRepo = new LogErrorMongoRepository()
  const addEmployeeController = new AddEmployeeController(null, null, null, addEmployee)
  return addEmployeeController
  //return new LogControllerDecorator(AddEmployeeController, LogErrorRepo)
}
