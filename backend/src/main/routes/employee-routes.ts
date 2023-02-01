import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddEmployeeController, makeFindEmployeeByIdController } from '../factories'

export default (router: Router): void => {
  router.post('/employee', adaptRoute(makeAddEmployeeController()))
  router.get('/employee/:id', adaptRoute(makeFindEmployeeByIdController()))
}
