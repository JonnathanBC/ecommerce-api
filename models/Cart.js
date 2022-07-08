const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  products: [
    {
      productId: {
        type: String
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
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

const Cart = model('Cart', cartSchema)

module.exports = Cart
