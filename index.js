require('dotenv').config()
require('./mongo')

const express = require('express')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const productRouter = require('./controllers/products')
const cartRouter = require('./controllers/cart')
const orderRouter = require('./controllers/orders')
const app = express()

app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
