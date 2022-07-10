const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../middleware/verifyToken')
const Order = require('../models/Order')
const orderRouter = require('express').Router()

// create
orderRouter.post('/', verifyToken, async (request, response) => {
  const newOrder = new Order(request.body)
  try {
    const savedOrder = await newOrder.save()
    response.status(201).json(savedOrder)
  } catch (err) {
    response.status(500).json(err)
  }
})

// get all
orderRouter.get('/', verifyTokenAndAdmin, async (request, response) => {
  try {
    const orders = await Order.find({})
    response.status(200).json(orders)
  } catch (err) {
    response.status(500).json(err)
  }
})

// get by user orders
orderRouter.get('/:userId', verifyTokenAndAuthorization, async (request, response) => {
  try {
    const { userId } = request.params
    const orders = await Order.findOne({ userId })
    response.status(200).json(orders)
  } catch (err) {
    response.status(404).json(err)
  }
})

// updated
orderRouter.put('/:id', verifyTokenAndAdmin, async (request, response) => {
  try {
    const { id } = request.params
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: request.body },
      { new: true }
    )
    response.status(200).json(updatedOrder)
  } catch (err) {
    response.status(304).json(err)
  }
})

// delete
orderRouter.delete('/:id', verifyTokenAndAdmin, async (request, response) => {
  try {
    const { id } = request.params
    await Order.findByIdAndDelete(id)
    response.status(204).json('Order has been deleted successfully')
  } catch (err) {
    response.status(500).json(err)
  }
})

// get monthly income
orderRouter.get('/income', verifyTokenAndAdmin, async (request, response) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount'
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' }
        }
      }
    ])

    response.status(200).json(income)
  } catch (err) {
    response.status(500).json(err)
  }
})
module.exports = orderRouter
