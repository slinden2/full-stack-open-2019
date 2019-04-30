const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const urlValidator = (url) => {
  const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  return urlRegexp.test(url)
}

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  author:  {
    type: String,
    required: true,
    minlength: 3
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlValidator(url),
      message: props => `${props.value} is not a valid url!`
    }
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)