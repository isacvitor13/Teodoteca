const router = require('express').Router()
const BookControllers = require('../controllers/BookControllers')
const verifyToken = require('../helpers/Verify-Token')

//Rota para cadastrar livro 
router.post('/create', verifyToken, BookControllers.Create)

//Rota para buscar todos os livros
router.get('/booksall', BookControllers.GetAll)

//Rotas para buscar meus livros
router.get('/mybooks/:id',verifyToken,BookControllers.GetMyBooks)

//Rota para buscar livro pelo Id
router.get('/:id', BookControllers.GetBookById)

//Rota para atualizar livro
router.patch('/edit/:id',verifyToken, BookControllers.updateBookById)

//Rata para excluir livro pelo id
router.delete('/:id',verifyToken, BookControllers.deleteBookById)

module.exports = router