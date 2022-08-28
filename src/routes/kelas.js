const express = require('express')
const router = express.Router()
const controller = require('../controllers/kelasController')

router.get('/kelas', controller.getKelas)
router.get('/kelas/:id', controller.getKelasById)
router.post('/kelas', controller.addKelas)
router.put('/kelas/:id', controller.editKelas)
router.delete('/kelas/:id', controller.deleteKelas)

// router for add tugas partisipan and pengampu
router.put('/kelas/partisipan/:id', controller.addPartisipan)
router.put('/kelas/pengampu/:id', controller.addPengampu)
router.put('/kelas/tugas/:id', controller.addTugas)

module.exports = router
