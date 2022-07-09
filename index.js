require('dotenv').config()
require('./mongo')

const express = require('express')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()

app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
