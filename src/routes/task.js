const express = require('express')
const router = express.Router()
const controller = require('../controllers/taskController')
const verifyJWT = require('../middlewares/adminAuth')

router.get('/task', verifyJWT.verifyAdmin, controller.getTask)
router.get('/task/:id', verifyJWT.verifyAdmin, controller.getTaskById)
router.post('/task', verifyJWT.verifyAdmin, controller.addTask)
router.put('/task/:id', verifyJWT.verifyAdmin, controller.editTask)
router.delete('/task/:id', verifyJWT.verifyAdmin, controller.deleteTask)

module.exports = router
