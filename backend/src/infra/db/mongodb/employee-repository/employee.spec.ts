import env from '../../../../main/config/env'
import { MongoHelper } from '../helpers/mongo-helper'
import { EmployeeMongoRepository } from './employee'

describe('employee Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const employeeCollection = await MongoHelper.getCollection('employees')
    await employeeCollection.deleteMany({})
  })

  const makeSut = (): EmployeeMongoRepository => {
    return new EmployeeMongoRepository()
  }

  test('Should return an employee on success', async () => {
    const sut = makeSut()
    const employee = await sut.add({
      firstName: 'any_name',
      lastName: 'any_name',
      email: 'any_mail',
      NISNumber: 12345
    })
    expect(employee).toBeTruthy()
    expect(employee.id).toBeTruthy()
    expect(employee.firstName).toBe('any_name')
    expect(employee.lastName).toBe('any_name')
    expect(employee.email).toBe('any_mail')
    expect(employee.NISNumber).toBe(12345)
  })
})
