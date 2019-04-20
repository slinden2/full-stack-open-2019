const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is one initial user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const newUser = new User({
      username: 'root',
      name: 'superuser',
      passwordHash: 'salainen'
    })
    await newUser.save()
  })

  test('a username can be saved only once in db', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'root',
      name: 'superuser',
      password: 'salainen'
    }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user creation works with correct status code', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      name: 'test user 1',
      password: 'salainen'
    }

    const savedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    expect(usersAtEnd.map(user => user.username)).toContain(savedUser.body.username)
  })

  test('invalid passwords get rejected with correct status code', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'tester',
      name: 'test user 1',
      password: 'sa'
    }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('Password must be at least')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('invalid usernames get rejected with correct status code', async () => {
    const usersAtStart = await helper.usersInDb() 

    const invalidUser = {
      username: 't',
      name: 'test user 1',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('invalid names get rejected with correct status code', async () => {
    const usersAtStart = await helper.usersInDb() 

    const invalidUser = {
      username: 'tester',
      name: 't',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})