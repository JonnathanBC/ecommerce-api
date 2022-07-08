const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// login
loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'Invalid username or password'
    })
  }

  // Saving information in the jwt
  const userForToken = {
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24 * 7
    }
  )

  response.send({
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin,
    token
  })
})

module.exports = loginRouter
