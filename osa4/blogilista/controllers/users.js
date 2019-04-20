const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
  } catch (exception) {
    next(exception)
  }

})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.password.length < 3) {
      throw {
        name: 'ValidationError',
        message: 'Password must be at least 3 characters long'
      }
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser.toJSON())


  } catch (exception) {
    next(exception)
  }
})


module.exports = usersRouter