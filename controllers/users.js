const userRouter = require('express').Router()

userRouter.get('/', (request, response) => {
  response.send('Users')
})

userRouter.post('', (request, response) => {
  const { body } = request
  const { username } = body

  console.log(username)
})

module.exports = userRouter
