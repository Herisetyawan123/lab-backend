const express = require('express')
const router = express.Router()
const controller = require('../controllers/taskController')

router.get('/task', controller.getTask)

module.exports = router
