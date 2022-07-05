require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('Backend Ecommerce Test')
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
