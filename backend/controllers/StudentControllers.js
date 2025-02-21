const Student = require('../models/Students')
const Classroons = require('../models/Classroons')
const Book = require('../models/Books')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class StudentControllers {

    static async create(req, res) {

        const { name, email, phone, student_registration, cpf, gender, student_class } = req.body

        //verifica se veio nome na requisição
        if (!name) {
            res.status(422).json({ message: 'O Nome é obrigatório!' })
            return
        }

        // Verificar se nome é válido
        const not_space_name = name.trim()
        if (not_space_name.length === 0) {
            res.status(422).json({ message: 'Envie um nome válido!' })
            return
        }

        //verifica se veio email na requisição
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }

        //verifica se o email é válido
        if (!email.includes('@')) {
            res.status(422).json({ message: "Insira um email válido!" })
            return
        }

        //verifica se o email já não esta cadastrado em outro usuário
        const emailexist = await Student.findOne({ email: email })
        if (emailexist) {
            res.status(422).json({ message: 'Este email já esta sendo utilizado por outro usuário' })
            return
        }

        //verifica se o número de telefone veio na requisição
        if (!phone) {
            res.status(422).json({ message: 'O número de telefone é obrigatório!' })
            return
        }

        // verifica se a matricula veio na requisição
        if (!student_registration) {
            res.status(422).json({ message: 'O número da matricula é obrigatório!' })
            return
        }
        // verifica se o número da matrícula está correto
        if (student_registration.toString().length !== 7) {
            res.status(422).json({ message: 'O número da matrícula deve conter 7 dígitos' })
            return
        }
        //verifica se o usuário já não possui cadastro
        const student_registrationExist = await Student.findOne({ student_registration: student_registration })
        if (student_registrationExist) {
            res.status(422).json({ message: 'Este usuário já possui cadastro!' })
            return
        }

        //Verifica se o CPF veio na requisição
        if (!cpf) {
            res.status(422).json({ message: 'O CPF é obrigatório!' })
            return
        }
      
        if (cpf.length !== 11) {
            res.status(422).json({ message: 'O CPF deve conter 11 dígitos' })
            return
        }

        //verifica se o usuário já não possui cadastro
        const cpfExist = await Student.findOne({ cpf: cpf })
        if (cpfExist) {
            res.status(422).json({ message: 'Este usuário já possui cadastro!' })
            return
        }

        //verifica se o sexo da pessoa veio na requisição
        if (!gender) {
            res.status(422).json({ message: 'O sexo é obrigatório!' })
            return
        }

        //verifica se a turma da pessoa veio na requisição
        if (!student_class) {
            res.status(422).json({ message: 'A turma é obrigatória!' })
            return
        }



        //verifica se a turma existe
        const classExist = await Classroons.findOne({ class_acronym: student_class })
        if (!classExist) {
            res.status(404).json({ message: 'Turma não existe!' })
            return
        }
        //cria o Estudante
        const student = new Student({
            name:name.trim(),
            cpf,
            email,
            gender,
            phone,
            student_registration,
            student_class: classExist,
        })

        try {
            //Salva o estudante no banco
            const newStudent = await student.save()
            res.status(201).json({ message: "Usuário cadastrado!", newStudent })
        } catch (error) {
            res.status(500).json({ error })
        }

    }

    static async GetAll(req, res) {
        //Busca todos os usuários cadastrados
        const Students = await Student.find()
        res.status(200).json({ Students })
    }

    static async GetStudentById(req, res) {
        //Busca o estudante pelo Id
        const id = req.params.id

        //Verificas se o ID é válido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido!' })
            return
        }

        const student = await Student.findById(id)
        //verifica se exite usuário com o Id recebido da requisição

        if (!student) {
            res.status(404).json({ message: 'Indivíduo não encontrado!' })
            return
        }

        res.status(200).json({ student })

    }

    static async UpdateStudentById(req, res) {
console.log(req.body)
        const id = req.params.id
        const { name, email, phone, student_registration, cpf, gender, student_class } = req.body
        const student = await Student.findById(id)

        //verifica se veio nome na requisição
        if (!name) {
            res.status(422).json({ message: 'O Nome é obrigatório!' })
            return
        }
        //verifica se o nome é válido
        const not_space_name = name.trim()
        if (not_space_name.length === 0) {
            res.status(422).json({ message: 'Envie um nome válido!' })
            return
        }

        student.name = name.trim()

        //verifica se veio email na requisição
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }

        //verifica se o email é válido
        if (!email.includes('@')) {
            res.status(422).json({ message: "Insira um email válido!" })
            return
        }

        //verifica se o email já não esta cadastrado em outro usuário
        const emailexist = await Student.findOne({ email: email })

        if (emailexist && email !== student.email) {
            res.status(422).json({ message: 'Este email já esta sendo utilizado por outro usuário!' })
            return
        }

        student.email = email

        //verifica se o número de telefone veio na requisição
        if (!phone) {
            res.status(422).json({ message: 'O número de telefone é obrigatório!' })
            return
        }
        student.phone = phone

        // verifica se a matricula veio na requisição
        if (!student_registration) {
            res.status(422).json({ message: 'O número da matricula é obrigatório!' })
            return
        }

        //verifica se o número da matrícula está correto
        if (student_registration.toString().length !== 7) {
            res.status(422).json({ message: 'Número da matrícula deve conter 7 dígitos!' })
            return
        }


        //verifica se o usuário já não possui cadastro
        const student_registrationExist = await Student.findOne({ student_registration: student_registration })
        if (student_registrationExist && student_registration !== student.student_registration) {
            res.status(422).json({ message: 'Este usuário já possui cadastro!' })
            return
        }

        student.student_registration = student_registration
        //Verifica se o CPF veio na requisição
        if (!cpf) {
            res.status(422).json({ message: 'O CPF é obrigatório!' })
            return
        }

        //verifica se o usuário já não possui cadastro
        const cpfExist = await Student.findOne({ cpf: cpf })
        if (cpfExist && cpf !== student.cpf) {
            res.status(422).json({ message: 'Este usuário já possui cadastro!' })
            return
        }
        student.cpf = cpf

        //verifica se o sexo da pessoa veio na requisição
        if (!gender) {
            res.status(422).json({ message: 'O sexo é obrigatório!' })
            return
        }
        student.gender = gender
        //verifica se a turma da pessoa veio na requisição
        if (!student_class) {
            res.status(422).json({ message: 'A turma é obrigatória!' })
            return
        }
        student.student_class = student_class
        try {
            await Student.findByIdAndUpdate(
                { _id: student._id },
                { $set: student },
                { new: true })
            res.status(200).json({ message: 'Usuário atualizado com sucesso!', student })
        } catch (error) {
            res.status(500).json({ error })
        }

    }
    static async deleteStudentById(req, res) {

        const id = req.params.id

        //Verifica se o Id é válido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id Inválido!' })
            return
        }

        //verifica se olivro existe no banco 
        const student = await Student.findById(id)
        if (!student) {
            res.status(404).json({ message: 'Usuário não encontrado!' })
            return
        }

        // verifica se o usuário possuí algum livro emprestado e bloqueia a exclusão
        const loanStudent = await Book.find({ 'loaned.id': student._id })
        if (loanStudent.length > 0) {
            res.status(422).json({ message: 'Devolva todos os livro para excluir este usuário!' })
            return
        }

        await Student.findByIdAndDelete(id)
        res.status(200).json({ message: 'Usuário excluído com sucesso!' })

    }


}