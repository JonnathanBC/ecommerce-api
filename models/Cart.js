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

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Cart = model('Cart', cartSchema)

module.exports = Cart
