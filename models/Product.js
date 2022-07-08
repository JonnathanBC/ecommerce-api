const { model, Schema } = require('mongoose')

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  categories: {
    type: Array
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  }
})

const Product = model('Product', productSchema)

module.exports = Product
