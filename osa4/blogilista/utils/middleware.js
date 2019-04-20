const tokenExtractor = (request, response, next) => {
  const token = request.get('Authorization')
  if (token) {
    request.token = token.substring(7)
  }
  next()
}

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}