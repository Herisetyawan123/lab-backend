const mongoose = require('mongoose')
const { Schema } = mongoose

// create collection Task
const taskSchema = new Schema({
  nama_tugas: {
    type: String,
    required: true

  },
  kelas: {
    type: Schema.Types.ObjectId,
    ref: 'Kelas'

  },
  url: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean
  },
  mahasiswa: [{
    type: Schema.Types.ObjectId,
    ref: 'Mahasiswa'
  }]
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task
