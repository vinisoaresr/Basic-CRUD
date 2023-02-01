import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddEmployeeController, makeFindEmployeeByIdController, makeDeleteEmployeeController } from '../factories'

export default (router: Router): void => {
  router.post('/employee', adaptRoute(makeAddEmployeeController()))
  router.get('/employee/:id', adaptRoute(makeFindEmployeeByIdController()))
  router.delete('/employee/:id', adaptRoute(makeDeleteEmployeeController()))
}
