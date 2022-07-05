const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log('DB connected successfully'))
  .catch(err => console.log(err))
