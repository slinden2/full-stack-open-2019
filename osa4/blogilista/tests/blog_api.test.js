const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const userArray = userObjects.map(user => user.save())
  await Promise.all(userArray)

  const user = await User.findOne({ username: 'test1' })

  const initialBlogs = helper.listWithManyBlogs.map(blog => new Blog({ ...blog, user: user._id }))
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
    const user = await User.findOne({ username: 'test1' })

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Testiblogi 1',
      author: 'Tatu Testaaja',
      url: 'http://www.testisaitti.fi',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogs = await helper.blogsInDb()
    expect(newBlogs.length).toBe(helper.listWithManyBlogs.length + 1)

    const titles = newBlogs.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
  })

  test('when no value is specified, the like property defaults to 0', async () => {
    const user = await User.findOne({ username: 'test1' })

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Testiblogi 2',
      author: 'Tatu Testaaja',
      url: 'http://www.testisaitti.fi'
    }

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    expect(addedBlog.body.likes).toBe(0)
  })

  test('when title and url properties are not defined, the server responds with status code 400 Bad request', async () => {
    const user = await User.findOne({ username: 'test1' })

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      author: 'Tatu Testaaja',
      likes: 1
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('deleting single blog by id works', async () => {
    const user = await User.findOne({ username: 'test1' })

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const allBlogsAtStart = await helper.blogsInDb()
    const blogId = allBlogsAtStart[0].id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
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