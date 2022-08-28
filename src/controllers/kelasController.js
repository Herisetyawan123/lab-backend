/* eslint-disable camelcase */
const Kelas = require('../Models/kelasModel')

exports.getKelas = async (req, res) => {
  try {
    const results = await Kelas.find().populate({ path: 'partisipan' }).populate({ path: 'pengampu' })
    res.status(200).json({
      message: 'Success',
      results
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Internal server Error',
      error
    })
  }
}

exports.getKelasById = async (req, res) => {
  try {
    const results = await Kelas.findById(req.params.id)
    res.status(200).json({
      message: 'Success',
      results
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

exports.addKelas = async (req, res) => {
  const { nama_kelas, jadwal, hari, tugas, partisipan, pengampu, status } = req.body
  const participants = []
  participants.push(partisipan)
  try {
    const kelas = await Kelas.create({ nama_kelas, jadwal, hari, tugas, partisipan: participants, pengampu, status })
    res.status(201).json({
      message: 'Success', kelas
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error', error
    })
  }
}

exports.editKelas = async (req, res) => {
  const idKelas = await Kelas.findById(req.params.id)
  if (!idKelas) {
    res.status('Fail').json({
      message: 'id not found'
    })
    return
  }
  try {
    const editKelas = await Kelas.updateOne({ _id: req.params.id }, { $set: req.body })
    res.status(200).json({
      message: 'Success',
      editKelas
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server Error',
      error
    })
  }
}

exports.deleteKelas = async (req, res) => {
  const idKelas = await Kelas.findById(req.params.id)
  if (!idKelas) {
    res.status(400).json({
      message: 'id not found'
    })
    return
  }
  try {
    const deleteKelas = await Kelas.deleteOne({ _id: req.params.id })
    res.status(200).json({
      message: 'Success',
      deleteKelas
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

// exports.addPartisipan = async (req, res) => {
//   const idKelas = await Kelas.findById(req.params.id)
//   if (!idKelas) {
//     return res.status(400).json({
//       message: 'Fail, id not found'
//     })
//   }

//   try {
//     const { partisipan } = 
//   } catch (error) {
    
//   }
// }
