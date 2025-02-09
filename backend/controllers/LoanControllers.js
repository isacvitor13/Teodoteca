const Book = require('../models/Books')
const Student = require('../models/Students')

const GetToken = require('../helpers/Get-token')
const GetServantByToken = require('../helpers/Get-Servant-By-Token')

const ObjectId = require('mongoose').Types.ObjectId

module.exports = class LoanControllers {

    static async Loan(req, res) {
        //Pega livro pelo Id que vem de parametro na requisição
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido!' })
            return
        }

        const book = await Book.findById(id)
        if (!book) {
            res.status(404).json({ message: 'Livro não encontardo' })
            return
        }

        //Pega o individuo pelo Id que vem pelo body
        const { studentid } = req.body

        if (!studentid) {
            res.status(422).json({ message: 'Id é obrigatório!' })
            return
        }
        if (!ObjectId.isValid(studentid)) {
            res.status(422).json({ message: 'Id do estudante inválido!' })
            return
        }

        const student = await Student.findById(studentid)
        if (!student) {
            res.status(422).json({ message: 'Estudante não encontrado' })
            return
        }


        //Verifica se o individou já não está com o livro 
        book.loaned = book.loaned || []
        const studentLoaned = book.loaned.find(students => students.id.toString() === student._id.toString())
        if (studentLoaned) {
            res.status(422).json({ message: 'Este usuário já está com este livro!' })
            return
        }

        // verifica se o livro pode ser emprestado
        if (book.amount <= book.loaned.length) {
            res.status(422).json({ message: 'Todos os livros já foram emprestados!' })
            return
        }



        //Busca o servidor pelo Token
        const token = GetToken(req)
        const servant = await GetServantByToken(token)

        //Adiciona as infomações do necessárias para o empréstimos  
        book.loaned.push({
            id: student._id,
            name: student.name,
            phone: student.phone,
            date: new Date(),
            servant: servant.name

        })
        if (book.amount === book.loaned.length) {
            book.loan = true
        } else if (book.amount > book.loaned.length) {
            book.loan = false
        }


        try {

            await Book.findByIdAndUpdate({ _id: book._id }, { $set: book }, { new: true })
            res.json({ message: `Livro emprestado para ${student.name}!` })


        } catch (error) {
            res.status(500).json({ error })
        }


    }
    static async ReturningBook(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido!' })
            return
        }

        const book = await Book.findById(id)
        if (!book) {
            res.status(404).json({ message: 'Livro não encontrado!' })
            return
        }

        const { studentid } = req.body

        if (!ObjectId.isValid(studentid)) {
            res.status(422).json({ message: 'Id de estudante inválido!' })
            return
        }


        const student = await Student.findById(studentid)

        if (!student) {
            res.status(422).json({ message: 'Nenhuma pessoa com este id foi encontrada!' })
            return
        }

        const loanExist = book.loaned.find(students => students.id.toString() === studentid.toString())
        if (!loanExist) {
            res.status(404).json({ message: `${student.name} não possui empréstimo com este livro!` })
            return
        }

        const newDate = new Date()
        loanExist.date = newDate

        book.loan_history = book.loan_history || []
        book.loan_history.push(loanExist)


        const loan_remove = book.loaned.filter(students => students.id.toString() !== studentid.toString())
        book.loaned = loan_remove
        book.loan = false
        try {
            await Book.findByIdAndUpdate({ _id: id }, { $set: book }, { new: true })
            res.status(201).json({ message: 'Devolução concluída!' })
        } catch (error) {
            res.status(500).json({ error })
        }

    }

}