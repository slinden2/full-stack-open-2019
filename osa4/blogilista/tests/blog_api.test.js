const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const testData = require('./test_data')
const app = require('../app')

const api = supertest(app)

beforeAll(async () => {
  await Blog.remove({})

  const initialBlogs = testData.listWithManyBlogs.map(blog => new Blog(blog))
  const promiseArray = initialBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('total number of blogs retrieved is correct', async () => {
  const allBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(allBlogs.body.length).toBe(testData.listWithManyBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})