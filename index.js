const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('Hello world!')
})

app.listen(3001, () => {
  console.log('Server is running in port 3001');
});