import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddEmployeeController } from '../factories/add-employee'

export default (router: Router): void => {
  router.post('/employee', adaptRoute(makeAddEmployeeController()))
}
