/* eslint-disable camelcase */
const Kelas = require('../Models/kelasModel')
const Mahasiswa = require('../Models/mahasiswaModel')

exports.getKelas = async (req, res) => {
  try {
    const results = await Kelas.find().populate({ path: 'partisipan' }).populate({ path: 'pengampu' }).populate({ path: 'tugas' })
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
    const results = await Kelas.findById(req.params.id).populate({ path: 'partisipan' }).populate({ path: 'pengampu' }).populate({ path: 'tugas' })
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

exports.addPartisipan = async (req, res) => {
  const idKelas = await Kelas.findById(req.params.id)
  if (!idKelas) {
    return res.status(400).json({
      message: 'Fail, id not found'
    })
  }

  try {
    const { partisipan } = req.body
    const participants = idKelas.partisipan
    if (participants.includes(partisipan)) {
      return res.status(405).json({
        message: 'participant is already exist'
      })
    }
    participants.push(partisipan)
    const addPartisipan = await Kelas.updateOne({ _id: req.params.id }, { $set: { partisipan: participants } })
    res.status(201).json({
      message: 'Success',
      result: addPartisipan
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}

exports.addPengampu = async (req, res) => {
  const idKelas = await Kelas.findById(req.params.id)
  if (!idKelas) {
    return res.status(400).json({
      message: 'Fail, id not found'
    })
  }

  try {
    const { pengampu } = req.body
    const idMahiswa = await Mahasiswa.findById(pengampu)
    if (idMahiswa.role === 'participants') {
      return res.status(400).json({
        message: 'Mahasiswa bukan pengampu'
      })
    }

    const pengampus = idKelas.pengampu
    if (pengampus.includes(pengampu)) {
      return res.status(405).json({
        message: 'participant is already exist'
      })
    }
    pengampus.push(pengampu)
    const addPengampu = await Kelas.updateOne({ _id: req.params.id }, { $set: { pengampu: pengampus } })
    res.status(201).json({
      message: 'Success',
      result: addPengampu
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}

exports.addTugas = async (req, res) => {
  const idKelas = await Kelas.findById(req.params.id)
  if (!idKelas) {
    return res.status(400).json({
      message: 'Fail, id not found'
    })
  }

  try {
    const { tugas } = req.body
    const tugass = idKelas.tugas
    if (tugass.includes(tugas)) {
      return res.status(405).json({
        message: 'Tugas is already exist'
      })
    }
    tugass.push(tugas)
    const addTugas = await Kelas.updateOne({ _id: req.params.id }, { $set: { tugas: tugass } })
    res.status(201).json({
      message: 'Success',
      result: addTugas
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
