const router = require('express').Router()
const ServantControllers = require('../controllers/ServantControllers')

router.post('/register', ServantControllers.Register)
router.post('/login', ServantControllers.Login)

module.exports = router

