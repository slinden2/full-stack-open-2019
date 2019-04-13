require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRuoter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRuoter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app