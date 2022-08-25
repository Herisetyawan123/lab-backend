const mongoose = require('mongoose')
const { Schema } = mongoose

const kelasSchema = new Schema({
  nama_kelas: {
    type: String,
    required: true

  },
  jadwal: {
    type: Date,
    required: true
  },
  hari: {
    type: String,
    required: true
  },
  tugas: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  partisipan: [{
    type: Schema.Types.ObjectId,
    ref: 'Mahasiswa'
  }],
  pengampu: [{
    type: Schema.Types.ObjectId,
    ref: 'Mahasiswa'
  }],
  status: {
    type: Boolean
  }
})
const Kelas = mongoose.model('Kelas', kelasSchema)

module.exports = Kelas
