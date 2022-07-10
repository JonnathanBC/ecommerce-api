const jwt = require('jsonwebtoken')

const verifyToken = (request, response, next) => {
  const authHeader = request.get('authorization') || ''
  const token = authHeader.substring(7)
  if (authHeader) {
    jwt.verify(
      token,
      process.env.SECRET,
      (err, user) => {
        if (err) response.status(403).json('Token is not valid!')
        request.user = user
        next()
      }
    )
  } else {
    return response.status(401).json('You are not authenticated!')
  }
}

const verifyTokenAndAuthorization = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
      next()
    } else {
      response.status(403).json('You are not alowed to do that!')
    }
  })
}

const verifyTokenAndAdmin = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.isAdmin) {
      next()
    } else {
      response.status(403).json('You are not alowed to do that!')
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
}
