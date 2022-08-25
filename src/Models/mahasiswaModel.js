const mongoose = require('mongoose')
const { Schema } = mongoose

const mahasiswaSchema = new Schema({
  nama: {
    type: String,
    required: true
  },
  nim: {
    type: String,
    required: true
  },
  role: {
    type: String, default: 'participants'
  },
  tugas: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  kelas: [{
    type: Schema.Types.ObjectId,
    ref: 'Kelas'
  }],
  password: {
    type: String
  }
})
const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema)

module.exports = Mahasiswa
