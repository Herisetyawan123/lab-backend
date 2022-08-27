const express = require('express')
const router = express.Router()
const controller = require('../controllers/mahasiswaController')

router.get('/mahasiswa', controller.getMahasiswa)
router.get('/mahasiswa/:id', controller.getMahasiswaById)
router.post('/mahasiswa', controller.addMahasiswa)
router.put('/mahasiswa/:id', controller.editMahasiswa)
router.delete('/mahasiswa/:id', controller.deleteMahasiswa)

module.exports = router
