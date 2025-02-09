const mongoose = require('../db/conn')
const { Schema } = mongoose

const Servant = mongoose.model(
    'servant',
    new Schema({
        name: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true

        },
        password: {
            type: String,
            required: true
        },

    }, { timestamps: true })
)

module.exports = Servant