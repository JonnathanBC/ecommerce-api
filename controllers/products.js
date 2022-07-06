const productsRouter = require('express').Router()

productsRouter.get('/', (request, response) => {
  response.send('Products API')
})

productsRouter.post('', (request, response) => {

})

module.exports = productsRouter
