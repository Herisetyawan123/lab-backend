/* eslint-disable camelcase */
const Task = require('../Models/tasksModel')

exports.getTask = async (req, res) => {
  try {
    const results = await Task.find().populate({ path: 'kelas' }).populate({ path: 'mahasiswa' })
    res.status(200).json({
      message: 'Success',
      results
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}

exports.getTaskById = async (req, res) => {
  try {
    const results = await Task.findById(req.params.id).populate({ path: 'kelas' }).populate({ path: 'mahasiswa' })
    if (!results) {
      return res.status(400).json({
        message: 'Fail, id not found'
      })
    }
    res.status(200).json({
      message: 'Succes',
      results
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}

exports.addTask = async (req, res) => {
  const { nama_tugas, kelas, url, deadline, status, mahasiswa } = req.body
  const mahasiswas = []
  const kelass = []
  mahasiswas.push(mahasiswa)
  kelass.push(kelas)
  try {
    const addTask = await Task.create({ nama_tugas, kelas: kelass, url, deadline, status, mahasiswa: mahasiswas })
    res.status(201).json({
      message: 'Success',
      result: addTask
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}

exports.editTask = async (req, res) => {
  const idTask = await Task.findById(req.params.id)
  console.log(idTask._id)
  if (!idTask) {
    return res.status(400).json({
      message: 'Fail, id not found'
    })
  }
  const { nama_tugas, kelas, url, deadline, status, mahasiswa } = req.body
  const mahasiswas = idTask.mahasiswa
  if (mahasiswas.includes(mahasiswa)) {
    return res.status(405).json({
      message: 'data mahasiswa is alredy exist'
    })
  }
  mahasiswas.push(mahasiswa)
  // console.log({ nama_tugas, kelas: kelass, url, deadline, status, mahasiswa: mahasiswas })
  try {
    const editTask = await Task.updateOne({ _id: req.params.id }, { $set: { nama_tugas, kelas, url, deadline, status, mahasiswa: mahasiswas } })
    res.status(200).json({
      message: 'Success',
      result: editTask
    })
  } catch (error) {
    res.status(500).json({
      message: 'error',
      error
    })
  }
}

exports.deleteTask = async (req, res) => {
  const idTask = await Task.findById(req.params.id)
  if (!idTask) {
    return res.status(400).json({
      message: 'Fail, id not found'
    })
  }
  try {
    const deleteTask = await Task.deleteOne({ _id: req.params.id })
    res.status(200).json({
      message: 'Success',
      result: deleteTask
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
