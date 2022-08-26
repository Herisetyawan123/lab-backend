const express = require('express')
const router = express.Router()
const controller = require('../controllers/kelasController')

router.get('/kelas', controller.getKelas)
router.post('/kelas', controller.addKelas)
router.get('/kelas/:id', controller.getKelasById)
router.put('/kelas/:id', controller.editKelas)
router.delete('/kelas/:id', controller.deleteKelas)

module.exports = router
