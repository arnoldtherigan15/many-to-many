const router = require('express').Router()
const projectController = require('../controllers/projectController')


router.post('/', projectController.create)
router.get('/', projectController.findAll)
router.get('/:id', projectController.findOne)
router.post('/:id', projectController.inviteMember)

module.exports = router