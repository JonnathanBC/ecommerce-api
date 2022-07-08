const { model, Schema } = require('mongoose')

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
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
  }
)

const Order = model('Order', orderSchema)

module.exports = Order
