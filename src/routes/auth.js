const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const refreshToken = require('../controllers/refreshTokenController')

router.post('/auth/login', controller.loginAdmin)
router.get('/auth/refresh', refreshToken.refreshToken)

module.exports = router
