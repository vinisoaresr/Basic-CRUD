
import { ObjectId } from 'mongodb'
import { AddEmployeeRepository, findEmployeeByIdRepository, FindAllEmployeeRepository, DeleteEmployeeByIdRepository } from '../../../../data/protocols'
import { EmployeeModel } from '../../../../domain/models/employee-model'
import { AddEmployeeModel } from '../../../../domain/useCases/add-employee'
import { MongoHelper } from '../helpers/mongo-helper'

export class EmployeeMongoRepository implements AddEmployeeRepository, findEmployeeByIdRepository, FindAllEmployeeRepository, DeleteEmployeeByIdRepository {
  async add (employeeData: AddEmployeeModel): Promise<EmployeeModel> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const { insertedId } = await employeeCollection.insertOne(employeeData)
    const employee = await employeeCollection.findOne({ _id: insertedId })
    return MongoHelper.mapToEntity(employee)
  }

  async find (id: string): Promise<EmployeeModel> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const employee = await employeeCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.mapToEntity(employee)
  }

  async findAll (): Promise<EmployeeModel[]> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const listEmployee = await employeeCollection.find().toArray()
    const employees = listEmployee.map(value => MongoHelper.mapToEntity(value))
    return employees
  }

  async delete (id: string): Promise<Boolean> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const result = await employeeCollection.deleteOne({ _id: new ObjectId(id) })
    return result.acknowledged
  }
}
