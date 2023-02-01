import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddEmployeeController, makeFindEmployeeByIdController, makeDeleteEmployeeController, makeFindAllEmployeeController } from '../factories'

export default (router: Router): void => {
  router.post('/employee', adaptRoute(makeAddEmployeeController()))
  router.get('/employee', adaptRoute(makeFindAllEmployeeController()))
  router.get('/employee/:id', adaptRoute(makeFindEmployeeByIdController()))
  router.delete('/employee/:id', adaptRoute(makeDeleteEmployeeController()))
}
