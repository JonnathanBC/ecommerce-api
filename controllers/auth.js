const authRouter = require('express').Router()
const User = require('../models/User')

authRouter.get('/', (request, response) => {
  response.send('Auth API')
})

// REGISTER
authRouter.post('/', async (request, response, next) => {
  const { username, email, password } = request.body

  const newUser = new User({
    username,
    email,
    password
  })

  try {
    const savedUSer = await newUser.save()
    response.json(savedUSer)
  } catch (err) {
    response.status(500).json(err)
  }
})

module.exports = authRouter
