const authRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

authRouter.get('/', (request, response) => {
  response.send('Auth API')
})

// REGISTER
authRouter.post('/', async (request, response, next) => {
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

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (err) {
    console.error(err)
    response.status(400).json(err)
  }
})

module.exports = authRouter
