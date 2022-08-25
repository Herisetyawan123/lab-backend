const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { route } = require('./src/routes/route')
const bodyParser = require('body-parser')
const DBconnect = require('./src/utils/dbConnect')

// allow origin
app.use(cors())
// return only json parse
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
// access route
app.use('/api', route)

// add port on .env
const port = process.env.PORT || 3000

// running port
DBconnect(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
})
