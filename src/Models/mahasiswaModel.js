const mongoose = require('mongoose')
const { Schema } = mongoose
const encrypt = require('../helpers/encrypt')

// create collection Mahasiswa
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
  password: {
    type: String,
    default: encrypt.cryptPassword('12345678')
  },
  tugas: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  kelas: [{
    type: Schema.Types.ObjectId,
    ref: 'Kelas'
  }]
})
const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema)

module.exports = Mahasiswa
