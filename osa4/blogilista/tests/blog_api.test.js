const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeAll(async () => {
  await Blog.deleteMany({})

  const initialBlogs = helper.listWithManyBlogs.map(blog => new Blog(blog))
  const promiseArray = initialBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('retrieving blogs', () => {
  test('total number of blogs retrieved is correct', async () => {
    const allBlogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(allBlogs.body.length).toBe(helper.listWithManyBlogs.length)
  })

  test('blog id property name is \'id\'', async () => {
    const allBlogs = await helper.blogsInDb()

    expect(allBlogs[0].id).toBeDefined()
  })
})

describe('adding blogs', () => {
  test('number of blogs increases after valid POST request', async () => {
    const newBlog = {
      title: 'Testiblogi 1',
      author: 'Tatu Testaaja',
      url: 'http://www.testisaitti.fi',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogs = await helper.blogsInDb()
    expect(newBlogs.length).toBe(helper.listWithManyBlogs.length + 1)

    const titles = newBlogs.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
  })

  test('when no value is specified, the like property defaults to 0', async () => {
    const newBlog = {
      title: 'Testiblogi 2',
      author: 'Tatu Testaaja',
      url: 'http://www.testisaitti.fi'
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(addedBlog.body.likes).toBe(0)
  })

  test.only('when title and url properties are not defined, the server responds with status code 400 Bad request', async () => {
    const newBlog = {
      author: 'Tatu Testaaja',
      likes: 1
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('deleting single blog by id works', async () => {
    const allBlogsAtStart = await helper.blogsInDb()
    const blogId = allBlogsAtStart[0].id

    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(204)

    const allBlogsAtEnd = await helper.blogsInDb()

    expect(allBlogsAtEnd.length).toBe(allBlogsAtStart.length - 1)
  })
})

describe('updating blogs', () => {
  test('updating number of likes works', async () => {
    const allBlogs = await helper.blogsInDb()
    const blog = allBlogs[0]

    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    const addedBlog = await api
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(addedBlog.body.likes).toBe(blog.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})