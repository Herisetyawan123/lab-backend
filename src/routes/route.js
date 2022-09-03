const express = require('express')
const router = express.Router()

router.use(require('./task'))
router.use(require('./kelas'))
router.use(require('./mahasiswa'))
router.use(require('./auth'))

module.exports = router
