// modularization
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const route = require('./src/routes/route')
const bodyParser = require('body-parser')
const DBconnect = require('./src/utils/dbConnect')

// call DB
DBconnect()

// allow origin
app.use(cors())

// return only json parse
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// access route
app.use('/api', route)
// route awal
app.get('/', (req, res) => {
  res.send('Hello Selamat Datang Back-End Lab, untuk mengakses data gunakan route https://back-en-lab.herokuapp.com/api/kelas || https://back-en-lab.herokuapp.com/api/mahasiswa || https://back-en-lab.herokuapp.com/api/task')
})

// add port on .env
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
