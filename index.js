require('dotenv').config()
require('./mongo')

const express = require('express')
const userRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')
const app = express()

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
