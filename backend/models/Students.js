const mongoose = require('../db/conn')
const { Schema } = mongoose

const student = mongoose.model(
    "student",
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            // required: true
        },
        phone: {
            type: String,
            required: true
        },
        student_registration: {
            type: Number,
            required: true
        },
        student_class: Object,
        cpf: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }

    }, { timestamps: true })
)

module.exports = student