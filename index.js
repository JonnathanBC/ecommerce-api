require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const productRouter = require('./controllers/products')
const cartRouter = require('./controllers/cart')
const orderRouter = require('./controllers/orders')
const stripeRouter = require('./controllers/stripe')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
app.use('/api/checkout', stripeRouter)

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
