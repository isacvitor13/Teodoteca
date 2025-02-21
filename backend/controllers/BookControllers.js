const GetServantByToken = require('../helpers/Get-Servant-By-Token')
const GetToken = require('../helpers/Get-token')
const Book = require('../models/Books')
const Student = require('../models/Students')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class BookControllers {

    static async Create(req, res) {

        const { name, author, isbn, amount, descripition, image } = req.body
        const loan = false
        //Verifica se o nome veio  na requisição
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (name.trim().length === 0) {
            res.status(422).json({ message: 'Envie um nome válido!' })
            return
        }

        //Verifica se o nome do autor veio  na requisição
        if (!author) {
            res.status(422).json({ message: 'O autor da obra é obrigatório!' })
            return
        }
        if (author.length === 0 || author.trim().length === 0) {
            res.status(422).json({ message: 'Envie um nome de autor válido!' })
            return
        }
        //Verifica se o ISBN veio  na requisição
        if (!isbn) {
            res.status(422).json({ message: 'O isnb do livro é obrigatório!' })
            return
        }

        if (isbn.toString().length !== 13) {
            res.status(422).json({ message: 'O ISBN deve conter 13 dígitos!' })
            return
        }
        //Verifica se o ISBN já existe no banco
        const isbnExist = await Book.findOne({ isbn: isbn })
        if (isbnExist) {
            res.status(422).json({ message: 'Este livro já está inserido no sistema!' })
            return
        }
        if (!amount) {
            res.status(422).json({ message: 'A quantidade deste livro é obrigatória!' })
            return
        }


        if (Number(amount) <= 0) {
            res.status(422).json({ message: 'A quantidade deve ser maior que 0!' })
            return
        }

        //criar o livro 
        const book = new Book({
            name: name.trim(),
            author: author.trim(),
            isbn,
            amount,
            descripition,
            image,
            loan,
            loaned: [],

        })

        try {
            //Adiciona o Livro ao banco de dados
            const newBook = await book.save()
            res.status(201).json({ message: 'Livro cadastrado com sucesso!', newBook })

        } catch (error) {
            res.status(500).json({ error })
        }

    }

    static async GetAll(req, res) {
        //busca todos os livros do banco 
        const Books = await Book.find()

        //verifica se a livros no banco 
        if (!Books) {
            res.status(404).json({ message: 'Não há livros cadastrados!' })
            return
        }
        res.status(200).json({ Books })

    }

    static async GetMyBooks(req, res) {


        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido!' })
            return
        }
        const student = await Student.findById({ _id: id })
        if (!student) {
            res.status(404).json({ message: 'Usuário não existe!' })
            return
        }

        const myBooks = await Book.find({ 'loaned.id': student._id })
        res.status(200).json({ myBooks })

    }

    static async GetBookById(req, res) {

        const id = req.params.id

        //Verifica se o Id é válido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido!' })
            return
        }


        //verifica se existe livro com tal Id no banco
        const book = await Book.findById(id)
        if (!book) {
            res.status(404).json({ message: 'Livro não encontrado!' })
            return
        }

        res.status(200).json({ book })
    }

    static async updateBookById(req, res) {

        const id = req.params.id

        //Verifica se o Id é válido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido' })
            return
        }

        const { name, isbn, author, descripition, image, amount } = req.body
        const updateData = {}

        //Verifica se o livro realmente existe
        const book = await Book.findById(id)
        if (!book) {
            res.status(404).json({ message: 'Livro não encontardo!' })
            return
        }

        //verifica se o nome do livro veio na requisição
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if ( name.trim().length === 0) {
            res.status(422).json({ message: 'Envie um nome válido!' })
            return
        }

        updateData.name = name.trim()

        //Verifica se o ISBN veio na requisição e se ele já não está presente em outro livro
        if (!isbn) {
            res.status(422).json({ message: 'O ISBN é obrigatório' })
            return
        }
        
        if (isbn.length !== 13) {
            res.status(422).json({ message: 'O ISBN deve conter 13 dígitos!' })
            return
        }
        //Verifica se este isbn já não está no banco de dados
        const isbnExits = await Book.findOne({ isbn: isbn })
        if (isbnExits && isbn !== book.isbn) {
            res.status(422).json({ message: 'Este ISBN já está sendo utilizado em outro livro!' })
            return
        }



        updateData.isbn = isbn

        //Verifica se a quantidade veio na requisição
        if (!amount) {
            res.status(422).json({ message: 'A quantidade é necessária' })
            return
        }
        updateData.amount = amount

        //verifica se o nome do autor veio na requisição
        if (!author) {
            res.status(422).json({ message: 'O nome do autor da Obra é obrigatório' })
            return
        }

        if (author.length === 0 || author.trim().length === 0) {
            res.status(422).json({ message: 'Envie um nome de autor válido!' })
            return
        }
        updateData.author = author.trim()


        updateData.descripition = descripition
        updateData.image = image

        try {

            await Book.findByIdAndUpdate(
                { _id: book._id },
                { $set: updateData },
                { new: true }
            )
            res.status(201).json({ message: 'Livro atualizado com sucesso!' })

        } catch (error) {
            res.status(422).json({ error })
        }

    }

    static async deleteBookById(req, res) {

        const id = req.params.id

        //Verifica se o Id é válido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id Inválido!' })
            return
        }

        //verifica se olivro existe no banco 
        const book = await Book.findById(id)
        if (!book) {
            res.status(404).json({ message: 'Livro não encontrado!' })
            return
        }

        if (book.loaned.length > 0) {
            res.status(422).json({ message: 'Finalize todos os empréstimos para excluir este livro!' })
            return
        }


        await Book.findByIdAndDelete(id)
        res.status(200).json({ message: 'Livro excluído com sucesso!' })

    }

}