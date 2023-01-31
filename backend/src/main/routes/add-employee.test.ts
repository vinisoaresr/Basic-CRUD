import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

describe('Employee Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('employee')
    await accountCollection.deleteMany({})
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
})
