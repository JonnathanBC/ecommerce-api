const { model, Schema } = require('mongoose')

const orderSchema = new Schema(
  {
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
    ],
    amount: {
      type: Number,
      required: true
    },
    address: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      default: 'pending'
    }
  }
)

const Order = model('Order', orderSchema)

module.exports = Order
