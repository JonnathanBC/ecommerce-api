const bcrypt = require('bcrypt')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const User = require('../models/User')

const userRouter = require('express').Router()

// get all
userRouter.get('/', verifyTokenAndAdmin, async (request, response) => {
  const user = await User.find({})
  response.json(user)
})

// get user by id
userRouter.get('/:id', verifyTokenAndAdmin, async (request, response) => {
  try {
    const { id } = request.params
    const user = await User.findById(id)
    response.status(200).json(user)
  } catch (err) {
    response.status(500).json(err)
  }
})

// create
userRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { username, name, password, email, lastName } = body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
      email,
      lastName
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    console.error(error)
    response.status(400).json(error)
  }
})

// updated
userRouter.put('/:id', verifyTokenAndAuthorization, async (request, response) => {
  const { id } = request.params
  if (request.body.password) {
    request.password = bcrypt(request.password, 10)
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: request.body },
      { new: true }
    )
    response.status(200).json(updatedUser)
  } catch (err) {
    response.status(500).json({ error: err })
    console.log(err)
  }
})

// delete
userRouter.delete('/:id', verifyTokenAndAdmin, async (request, response) => {
  const { id } = request.params
  await User.findByIdAndDelete(id)

  response.status(204).end()
})

module.exports = userRouter
