import { ObjectId } from "mongodb"
import { AddEmployeeRepository, EditEmployeeRepository, findEmployeeByIdRepository, FindAllEmployeeRepository, DeleteEmployeeByIdRepository, CheckEmployeeRepository } from "../../../../data/protocols"
import { EmployeeModel } from "../../../../domain/models/employee-model"
import { AddEmployeeModel } from "../../../../domain/useCases/add-employee"
import { EditEmployeeModel } from "../../../../domain/useCases/Edit-employee"
import { MongoHelper } from "../helpers/mongo-helper"


export class EmployeeMongoRepository implements AddEmployeeRepository, EditEmployeeRepository, findEmployeeByIdRepository, FindAllEmployeeRepository, DeleteEmployeeByIdRepository, CheckEmployeeRepository {
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

  async delete (id: string): Promise<boolean> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const result = await employeeCollection.deleteOne({ _id: new ObjectId(id) })
    return result.acknowledged
  }

  async edit (employeeData: EditEmployeeModel): Promise<EmployeeModel> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const document = await employeeCollection.updateOne(
      { _id: new ObjectId(employeeData.id) },
      {
        $set:
        {
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          email: employeeData.email,
          NISNumber: employeeData.NISNumber
        }
      },
      { upsert: true })
    const employee = await employeeCollection.findOne({ _id: new ObjectId(employeeData.id) })
    return MongoHelper.mapToEntity(employee)
  }

  async check (id: string): Promise<boolean> {
    const employeeCollection = await MongoHelper.getCollection('employee')
    const employee = await employeeCollection.findOne({ _id: new ObjectId(id) })
    if (employee) {
      return true
    } else {
      return false
    }
  }
}
