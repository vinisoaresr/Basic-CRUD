import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let employeeCollection: Collection

describe('Employee Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    employeeCollection = await MongoHelper.getCollection('employee')
    await employeeCollection.deleteMany({})
  })
  test('Should return an employee on success', async () => {
    await request(app)
      .post('/api/employee')
      .send({
        firstName: 'valid_name',
        lastName: 'valid_name',
        email: 'valid_email@mail.com',
        NISNumber: '12345'
      })
      .expect(200)
  })
  test('Should return an employee by id on success', async () => {
    const { insertedId } = await employeeCollection.insertOne({
      firstName: 'valid_name',
      lastName: 'valid_name',
      email: 'valid_email@mail.com',
      NISNumber: '12345'
    })
    await request(app)
      .get(`/api/employee/${insertedId}`)
      .expect(200)
  })
})
