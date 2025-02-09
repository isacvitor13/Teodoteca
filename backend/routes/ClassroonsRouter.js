//Verificação se a pessoa está logada
const verifyToken = require('../helpers/Verify-Token')

const router = require('express').Router()

//Controllers das rotas
const ClassroonsControllers = require('../controllers/ClassroonsControllers')


//Rota para criar turma
router.post('/create', verifyToken, ClassroonsControllers.Create)
// Rota para buscar todas as turmas
router.get('/getclass', ClassroonsControllers.GetAllClass)
// Rota para remover turma
router.delete('/remove/:id', verifyToken, ClassroonsControllers.Remove)


module.exports = router