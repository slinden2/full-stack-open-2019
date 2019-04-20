const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: 'unknown endpoint' })
}

const passwordException = () => {
  return { error: 'Password must be at least 6 characters long' }
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}