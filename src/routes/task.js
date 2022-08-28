const express = require('express')
const router = express.Router()
const controller = require('../controllers/taskController')

router.get('/task', controller.getTask)
router.get('/task/:id', controller.getTaskById)
router.post('/task', controller.addTask)
router.put('/task/:id', controller.editTask)
router.delete('/task/:id', controller.deleteTask)

module.exports = router
