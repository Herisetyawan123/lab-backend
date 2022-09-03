// modularization
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const route = require('./src/routes/route')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const DBconnect = require('./src/utils/dbConnect')

// call DB
DBconnect()

// allow origin
app.use(cors())

// middleware for json
app.use(bodyParser.json())

// middleware for handler urlencoded form data yess
app.use(bodyParser.urlencoded({ extended: true }))

// middlerware for cookies
app.use(cookieParser())

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
