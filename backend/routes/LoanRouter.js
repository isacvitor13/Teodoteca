const router = require('express').Router()
const verifyToken = require('../helpers/Verify-Token')

const LoanControllers = require('../controllers/LoanControllers')


router.patch('/:id', verifyToken, LoanControllers.Loan)
router.patch('/return/book/:id', verifyToken, LoanControllers.ReturningBook)


module.exports = router