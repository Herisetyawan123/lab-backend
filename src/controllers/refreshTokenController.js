/* eslint-disable eqeqeq */
const Mahasiswa = require('../Models/mahasiswaModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      return res.sendStatus(401)
    }
    const refreshToken = cookies.jwt
    const isRefreshToken = await Mahasiswa.findOne({ refreshToken: cookies.jwt })
    if (!isRefreshToken) {
      return res.sendStatus(403)
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || isRefreshToken.nim != decoded.nim) {
          return res.sendStatus(403)
        }
        const accessToken = jwt.sign({
          nama: isRefreshToken.nama,
          role: isRefreshToken.role,
          nim: isRefreshToken.nim
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        res.status(200).json({ accessToken })
      }
    )
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
