/* eslint-disable eqeqeq */
const Mahasiswa = require('../Models/mahasiswaModel')
const encrypt = require('../helpers/encrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.loginAdmin = async (req, res) => {
  const { nim, password } = req.body
  try {
    const login = await Mahasiswa.findOne({ nim })
    if (!nim || nim.length < 12) {
      return res.status(404).json({
        message: 'nim tidak ada'
      })
    }
    if (login.role.toLowerCase() != 'pengampu') {
      return res.status(400).json({
        message: 'Fail, mahasiswa yang bukan pengampu tidak bisa login'
      })
    }
    const cekPassword = await encrypt.comparePassword(password, login.password)
    if (!cekPassword) {
      return res.status(400).json({
        message: 'Fail login password salah'
      })
    }
    const accessToken = jwt.sign({
      nama: login.nama,
      role: login.role,
      nim: login.nim
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
    const refreshToken = jwt.sign({
      nama: login.nama,
      role: login.role,
      nim: login.nim
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
    const loginMahasiswa = await Mahasiswa.updateOne({ _id: login._id }, { $set: { refreshToken } })
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).json({
      message: 'Login berhasil',
      accessToken
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
