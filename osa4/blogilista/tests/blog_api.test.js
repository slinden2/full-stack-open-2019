const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeAll(async () => {
  await Blog.remove({})

  const initialBlogs = helper.listWithManyBlogs.map(blog => new Blog(blog))
  const promiseArray = initialBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('total number of blogs retrieved is correct', async () => {
  const allBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(allBlogs.body.length).toBe(helper.listWithManyBlogs.length)
})

test('blog id property name is \'id\'', async () => {
  const allBlogs = await api
    .get('/api/blogs')

  expect(allBlogs.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})