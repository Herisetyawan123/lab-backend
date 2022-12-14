const Mahasiswa = require('../Models/mahasiswaModel')
const encrypt = require('../helpers/encrypt')

exports.getMahasiswa = async (req, res) => {
  try {
    const results = await Mahasiswa.find()
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

exports.getMahasiswaById = async (req, res) => {
  try {
    const result = await Mahasiswa.findById(req.params.id)
    if (!result) {
      return res.status(400).json({
        message: 'Fail, Id not found'
      })
    }
    res.status(200).json({
      message: 'Success',
      result
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

exports.addMahasiswa = async (req, res) => {
  const { nama, nim, role, password, tugas, kelas } = req.body
  try {
    const addMahasiswa = await Mahasiswa.create({ nama, nim, role, password: encrypt.cryptPassword(password), tugas, kelas })
    res.status(201).json({
      message: 'Success',
      result: addMahasiswa
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error
    })
  }
}

exports.editMahasiswa = async (req, res) => {
  const idMahasiswa = await Mahasiswa.findById(req.params.id)
  console.log(idMahasiswa)
  if (!idMahasiswa) {
    return res.status(400).json({
      message: 'id not found'
    })
  }
  try {
    const { nama, nim, role, password, tugas, kelas } = req.body
    const editMahasiswa = await Mahasiswa.updateOne({ _id: req.params.id }, { $set: { nama, nim, role, password: encrypt.cryptPassword(password), tugas, kelas } })
    res.status(200).json({
      message: 'Success',
      result: editMahasiswa
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}

exports.deleteMahasiswa = async (req, res) => {
  const idMahasiswa = await Mahasiswa.findById(req.params.id)
  if (!idMahasiswa) {
    return res.status(400).json({
      message: 'id not found'
    })
  }
  try {
    const deleteMahasiswa = await Mahasiswa.deleteOne({ _id: req.params.id })
    res.status(200).json({
      message: 'Success',
      result: deleteMahasiswa
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
