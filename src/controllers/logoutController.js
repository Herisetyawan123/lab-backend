/* eslint-disable eqeqeq */
const Mahasiswa = require('../Models/mahasiswaModel')

exports.logoutAdmin = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res.sendStatus(204)
  }
  const token = cookies.jwt
  try {
    const isRefreshToken = await Mahasiswa.findOne({ refreshToken: token })
    if (!isRefreshToken) {
      res.clearCookie('jwt', { htppOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      return res.sendStatus(403)
    }
    const deleteToken = await Mahasiswa.updateOne({ _id: isRefreshToken._id }, { $set: { refreshToken: '' } })
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).json({ message: 'anda sudah logout' })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
