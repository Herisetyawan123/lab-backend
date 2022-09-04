const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const refreshToken = require('../controllers/refreshTokenController')
const logoutController = require('../controllers/logoutController')

router.post('/auth/login', controller.loginAdmin)
router.get('/auth/refresh', refreshToken.refreshToken)
router.get('/auth/logout', logoutController.logoutAdmin)

module.exports = router
