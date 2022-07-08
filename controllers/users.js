const User = require('../models/User')

const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
  const user = await User.find({})
  response.json(user)
})

userRouter.post('', (request, response) => {

})

module.exports = userRouter
