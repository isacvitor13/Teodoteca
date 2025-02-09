const router = require('express').Router()

const StudentControllers = require('../controllers/StudentControllers')
const verifyToken = require('../helpers/Verify-Token')
//rota para criar indivíduo
router.post('/create', verifyToken, StudentControllers.create)

//rota para buscar todos os  indivíduo
router.get('/all', StudentControllers.GetAll)

//rota para buscar indivíduo pelo Id
router.get('/:id', StudentControllers.GetStudentById)

//rota para atualizar dados do individuo
router.patch('/edit/:id', verifyToken, StudentControllers.UpdateStudentById)

//Rota para exluir usuário 
router.delete('/:id', verifyToken, StudentControllers.deleteStudentById)

module.exports = router