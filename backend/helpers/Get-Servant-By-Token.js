const jwt = require('jsonwebtoken')
const Servant = require('../models/Servant')

const GetServantByToken = async (token) => {
    if (!token) {
        res.status(401).json({ message: 'Acesso negado!' })
        return
    }

    const decoded = jwt.verify(token, 'TeodomiroSecret@1234567890')
    const servantid = decoded.id

    const servant = await Servant.findOne({ _id: servantid })
    return servant
}

module.exports = GetServantByToken