const router = require('express').Router()
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const todoRouter = require('./todoRouter')
const authentication = require('../middlewares/authentication')

router.get('/', (req,res) => req.json({msg: 'welcome to shibe collection'}))

router.use('/users', userRouter)
router.use(authentication)
router.use('/projects', projectRouter)
router.use('/todos', todoRouter)

module.exports = router