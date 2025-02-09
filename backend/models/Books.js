const mongoose = require('../db/conn')
const { Schema } = mongoose

const Book = mongoose.model(
    "books",
    new Schema({
        name: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        descripition: {
            type: String
        },
        image: {
            type: String,
        },
        loan: {
            type: Boolean,
            required: true
        },
        loaned: Object,
        loan_history: Object


    }, { timestamps: true })
)

module.exports = Book