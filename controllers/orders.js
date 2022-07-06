const ordersRouter = require('express').Router()

ordersRouter.get('/', (request, response) => {
  response.send('Orders API')
})

ordersRouter.post('', (request, response) => {

})

module.exports = ordersRouter
