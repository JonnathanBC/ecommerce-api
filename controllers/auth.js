const authRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

authRouter.get('/', (request, response) => {
  response.send('Auth API')
})

// register
authRouter.post('/register', async (request, response, next) => {
  try {
    const { email, lastName, name, username, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      email,
      lastName,
      name,
      username,
      passwordHash
    })

    // save mongo
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (err) {
    console.error(err)
    response.status(400).json(err)
  }
})

// login
authRouter.post('/login', async (request, response) => {
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

module.exports = authRouter
