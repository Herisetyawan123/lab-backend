import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connection = {
}

async function dbConnect () {
  const db = await mongoose.connect(process.env.CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  connection.isConncected = db.connection.readyState
}

export default dbConnect
