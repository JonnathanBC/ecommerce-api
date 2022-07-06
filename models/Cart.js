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
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
})

const Cart = model('Cart', cartSchema)

module.exports = Cart
