import { DbAddEmployeeImpl } from '../../data/useCases/db-add-employee'
import { DbEditEmployeeImpl } from '../../data/useCases/employee/db-edit-employee'
import { EmployeeMongoRepository } from '../../infra/db/mongodb/employee-repository/employee'
import { EditEmployeeController } from '../../presentation/controllers/employee/edit-employee'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator/email-validator-adapter'
import { NumberValidatorAdapter } from '../../utils/number-validator/number-validator-adapter'
import { TextValidatorAdapter } from '../../utils/text-validator/text-validator-adapter'

export const makeEditEmployeeByIdController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const textValidatorAdapter = new TextValidatorAdapter()
  const numberValidator = new NumberValidatorAdapter()
  const editEmployeeRepository = new EmployeeMongoRepository()
  const mongoDbEditEmployee = new DbEditEmployeeImpl(editEmployeeRepository, editEmployeeRepository)
  const editEmployeeController = new EditEmployeeController(textValidatorAdapter, emailValidator, numberValidator, mongoDbEditEmployee)
  return editEmployeeController
}
