const Classroons = require('../models/Classroons')
const Student = require('../models/Students')

module.exports = class ClassroonsControllers {

    //Função para criar Turma
    static async Create(req, res) {
        // Pega o nome da turma que veio na requisição
        const { classroons } = req.body

        // Verifica se veio o nome na requisição
        if (!classroons) {
            res.status(422).json({ message: 'Envie o nome da turma!' })
            return
        }
        const classExist = await Classroons.findOne({ classroons: classroons })
        if (classExist) {
            res.status(422).json({ message: 'Está Turma já existe!' })
            return
        }
        // Criar o schema da turma
        const classroon = new Classroons({ classroons: classroons, class_acronym: classroons.split(' ')[0] })

        try {
            // Salva a turma no banco de dados
            const NewClassroons = await classroon.save()
            res.status(201).json({ message: 'Turma criada!', NewClassroons })
        } catch (error) {
            res.status(500).json({ error })
        }

    }
    static async GetAllClass(req, res) {
        // busca todas as turmas
        const classroons = await Classroons.find()
        res.status(200).json({ classroons })
    }

    static async Remove(req, res) {

        //pega o id da requisição
        const id = req.params.id

        //Verifica se a turma existe
        const classroonExist = await Classroons.findById({ _id: id })

        if (!classroonExist) {
            res.status(404).json({ message: 'Turma não encontrada!' })
            return
        }



        //Verifica se existe algum usuário cadastrado com a turma a ser excluída
        const StudentWithClass = await Student.find({ 'student_class._id': classroonExist._id })
        if (StudentWithClass.length > 0) {
            res.status(422).json({ message: 'Exitem alunos cadastrados nesta turma. Para Excluí-la remova o aluno primeiro!' })
            return
        }

        //Busca a turma pelo id e a remove
        try {
            const classroons = await Classroons.findByIdAndDelete({ _id: id })
            res.status(200).json({ message: `A turma ${classroons.classroons} deletada com sucesso!` })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}