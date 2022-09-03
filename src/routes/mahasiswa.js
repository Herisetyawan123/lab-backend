const express = require('express')
const router = express.Router()
const controller = require('../controllers/mahasiswaController')
const verifyJWT = require('../middlewares/adminAuth')

router.get('/mahasiswa', verifyJWT.verifyAdmin, controller.getMahasiswa)
router.get('/mahasiswa/:id', verifyJWT.verifyAdmin, controller.getMahasiswaById)
router.post('/mahasiswa', verifyJWT.verifyAdmin, controller.addMahasiswa)
router.put('/mahasiswa/:id', verifyJWT.verifyAdmin, controller.editMahasiswa)
router.delete('/mahasiswa/:id', verifyJWT.verifyAdmin, controller.deleteMahasiswa)

module.exports = router
