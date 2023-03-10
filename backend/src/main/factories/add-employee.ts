import { DbAddEmployeeImpl } from '../../data/useCases/db-add-employee'
import { EmployeeMongoRepository } from '../../infra/db/mongodb/employee-repository/employee'
import { AddEmployeeController } from '../../presentation/controllers/add-employee'
import { type Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator/email-validator-adapter'
import { NumberValidatorAdapter } from '../../utils/number-validator/number-validator-adapter'
import { TextValidatorAdapter } from '../../utils/text-validator/text-validator-adapter'
// import { LogControllerDecorator } from '../decorator/log'
// import { LogErrorMongoRepository } from '../../infra/db/mongodb/log-repository/log'

export const makeAddEmployeeController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const textValidatorAdapter = new TextValidatorAdapter()
  const numberValidator = new NumberValidatorAdapter()
  const addEmployeeRepository = new EmployeeMongoRepository()
  const mongoDbAddEmployee = new DbAddEmployeeImpl(addEmployeeRepository)
  const addEmployeeController = new AddEmployeeController(textValidatorAdapter, emailValidator, numberValidator, mongoDbAddEmployee)
  return addEmployeeController
  // const LogErrorRepo = new LogErrorMongoRepository()
  // return new LogControllerDecorator(signUpController, LogErrorRepo)
}
