const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../middleware/verifyToken')
const Cart = require('../models/Cart')
const cartRouter = require('express').Router()

// create
cartRouter.post('/', verifyToken, async (request, response) => {
  const newCart = new Cart(request.body)
  try {
    const savedCart = await newCart.save()
    response.status(201).json(savedCart)
  } catch (err) {
    response.status(500).json(err)
  }
})

// get all
cartRouter.get('/', verifyTokenAndAdmin, async (request, response) => {
  try {
    const carts = await Cart.find({})
    response.status(200).json(carts)
  } catch (err) {
    response.status(500).json(err)
  }
})

// get by user cart
cartRouter.get('/:userId', verifyTokenAndAuthorization, async (request, response) => {
  try {
    const { userId } = request.params
    const cart = await Cart.findOne({ userId })
    response.status(200).json(cart)
  } catch (err) {
    response.status(404).json(err)
  }
})

// updated
cartRouter.put('/:id', verifyTokenAndAuthorization, async (request, response) => {
  try {
    const { id } = request.params
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $set: request.body },
      { new: true }
    )
    response.status(200).json(updatedCart)
  } catch (err) {
    response.status(304).json(err)
  }
})

// delete
cartRouter.delete('/:id', verifyTokenAndAuthorization, async (request, response) => {
  try {
    const { id } = request.params
    await Cart.findByIdAndDelete(id)
    response.status(204).json('Cart has been deleted successfully')
  } catch (err) {
    response.status(500).json(err)
  }
})

module.exports = cartRouter
