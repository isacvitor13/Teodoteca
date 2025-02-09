const mongoose = require('../db/conn')
const { Schema } = mongoose

const Classroons = mongoose.model(
    'Classroons', new Schema({
        classroons: {
            type: String,
            required: true
        },
        class_acronym: {
            type: String,
            required: true
        }

    })
)

module.exports = Classroons