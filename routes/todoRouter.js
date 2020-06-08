const router = require('express').Router()
const todoController = require('../controllers/todoController')


// router.get('/:projectId', todoController.findAll)
// router.get('/:id', todoController.findOne)
router.post('/:projectId', todoController.create)

module.exports = router