const { verifyTokenAndAdmin } = require('../middleware/verifyToken')
const Product = require('../models/Product')

const productRouter = require('express').Router()

// get all
productRouter.get('/', async (request, response) => {
  try {
    const qNew = request.query.new
    const qCategory = request.query.category

    let products
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5)
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } })
    } else {
      products = await Product.find({})
    }
    response.status(200).json(products)
  } catch (err) {
    response.status(404).json(err)
  }
})

// get by id
productRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const product = await Product.findById(id)
    response.status(200).json(product)
  } catch (err) {
    response.status(404).json(err)
  }
})

// create
productRouter.post('/', verifyTokenAndAdmin, async (request, response) => {
  const newProduct = new Product(request.body)
  try {
    const savedProduct = await newProduct.save()
    response.status(201).json(savedProduct)
  } catch (err) {
    response.status(500).json(err)
  }
})

// updated
productRouter.put('/:id', verifyTokenAndAdmin, async (request, response) => {
  try {
    const { id } = request.params
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: request.body },
      { new: true }
    )
    response.status(200).json(updatedProduct)
  } catch (err) {
    response.status(304).json(err)
  }
})

// delete
productRouter.delete('/:id', verifyTokenAndAdmin, async (request, response) => {
  try {
    const { id } = request.params
    await Product.findByIdAndDelete(id)
    response.status(204).json('Product has been deleted successfully')
  } catch (err) {
    response.status(500).json(err)
  }
})

module.exports = productRouter
