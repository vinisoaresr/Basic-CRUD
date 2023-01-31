
import { AddEmployeeRepository, findEmployeeByIdRepository } from '../../../../data/protocols'
import { EmployeeModel } from '../../../../domain/models/employee-model'
import { AddEmployeeModel } from '../../../../domain/useCases/addEmployee'
import { MongoHelper } from '../helpers/mongo-helper'

export class EmployeeMongoRepository implements AddEmployeeRepository, findEmployeeByIdRepository {
  async add (employeeData: AddEmployeeModel): Promise<EmployeeModel> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const { insertedId } = await employeeCollection.insertOne(employeeData)
    const account = await employeeCollection.findOne({ _id: insertedId })
    return MongoHelper.mapToEntity(account)
  }

  async find (id: string): Promise<EmployeeModel> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const employee = await employeeCollection.findOne({ _id: id })
    return MongoHelper.mapToEntity(employee)
  }
}
