const express = require('express')
const app = express()
const cors = require('cors')

// allow origin
app.use(cors())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
