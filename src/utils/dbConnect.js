const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()
const connection = {
}

async function dbConnect () {
  const db = await mongoose.connect(process.env.CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  connection.isConncected = db.connection.readyState
  console.log('database connection')
}

module.exports = dbConnect
