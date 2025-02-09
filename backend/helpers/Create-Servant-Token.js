const jwt = require('jsonwebtoken')

const CreateServantToken = async (newServant, req, res) => {

    const token = jwt.sign({
        name: newServant.name,
        id: newServant._id
    }, 'TeodomiroSecret@1234567890')

    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        servantid: newServant._id
    })
}

module.exports = CreateServantToken