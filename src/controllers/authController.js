const Mahasiswa = require('../Models/mahasiswaModel')
const encrypt = require('../helpers/encrypt')

exports.loginAdmin = async (req, res) => {
  const { nim, password } = req.body
  try {
    const login = await Mahasiswa.findOne({ nim })
    if (!nim || nim.length < 12) {
      return res.status(404).json({
        message: 'nim tidak ada'
      })
    }
    if (login.role !== 'pengampu || Pengampu') {
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
    res.status(200).json({
      message: 'Login berhasil'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
