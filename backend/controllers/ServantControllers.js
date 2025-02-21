const Servant = require('../models/Servant')
const bcrypt = require('bcrypt')
const CreateServantToken = require('../helpers/Create-Servant-Token')

module.exports = class ServantControllers {
    static async Register(req, res) {

        const { name, cpf, email, password, confirmPassword } = req.body

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }
        if (!cpf) {
            res.status(422).json({ message: 'O CPF é obrigatório!' })
            return
        }

        const cpfExists = await Servant.findOne({ cpf: cpf })
        if (cpfExists) {
            res.status(422).json({ message: 'Já existe usuário com este CPF!' })
            return
        }

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }
        if (!email.includes('@')) {
            res.status(422).json({ message: 'Insira um email válido' })
            return
        }

        const emailExists = await Servant.findOne({ email: email })
        if (emailExists) {
            res.status(422).json({ message: 'Já existe usuário com este email já existe!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }
        if (!confirmPassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
            return
        }

        if (confirmPassword !== password) {
            res.status(422).json({ message: 'Senha e confirmação de senha não conferem!' })
            return
        }


        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)


        const servant = new Servant({
            name,
            cpf,
            email,
            password: passwordHash
        })

        try {
            const newServant = await servant.save()
            await CreateServantToken(newServant, req, res)

        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async Login(req, res) {

        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'Informe o email do servidor!' })
            return

        }
        const servant = await Servant.findOne({ email: email })
        if (!servant) {
            res.status(422).json({ message: 'Não existe usuário come este email!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'Senha é obrigatória!' })
            return
        }

        const checkPassowrd = await bcrypt.compare(password, servant.password)

        if (!checkPassowrd) {
            res.status(422).json({ message: 'Senha incorreta!' })
            return
        }


        await CreateServantToken(servant, req, res)
    }
}