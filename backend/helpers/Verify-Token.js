const jwt = require('jsonwebtoken')
const GetToken = require('./Get-token')

const verifyToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Acesso negado!" })
    }
    const token = GetToken(req)
    if (!token) {
        return res.status(401).json({ message: "Acesso negado!" })

    }
    try {
        const verified = jwt.verify(token, 'TeodomiroSecret@1234567890')
        req.user = verified
        next()

    } catch (error) {
        return res.status(400).json({ message: 'Token inválido!' })
    }
}

module.exports = verifyToken