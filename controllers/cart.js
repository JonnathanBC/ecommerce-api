const cartsRouter = require('express').Router()

cartsRouter.get('/', (request, response) => {
  response.send('Carts API')
})

cartsRouter.post('', (request, response) => {

})

module.exports = cartsRouter
