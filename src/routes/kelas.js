const express = require('express')
const router = express.Router()
const controller = require('../controllers/kelasController')
const verifyJWT = require('../middlewares/adminAuth')

router.get('/kelas', verifyJWT.verifyAdmin, controller.getKelas)
router.get('/kelas/:id', verifyJWT.verifyAdmin, controller.getKelasById)
router.post('/kelas', verifyJWT.verifyAdmin, controller.addKelas)
router.put('/kelas/:id', verifyJWT.verifyAdmin, controller.editKelas)
router.delete('/kelas/:id', verifyJWT.verifyAdmin, controller.deleteKelas)

// router for add tugas partisipan and pengampu
router.put('/kelas/partisipan/:id', verifyJWT.verifyAdmin, controller.addPartisipan)
router.put('/kelas/pengampu/:id', verifyJWT.verifyAdmin, controller.addPengampu)
router.put('/kelas/tugas/:id', verifyJWT.verifyAdmin, controller.addTugas)

// route for delete partisipan
router.put('/kelas/partisipan/delete/:id', verifyJWT.verifyAdmin, controller.deletePartisipan)
module.exports = router
