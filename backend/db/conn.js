const mongoose = require('mongoose')

async function main(){
    //conecta ao banco de dados 
    await mongoose.connect("mongodb+srv://isac:isac1234@cluster0.9nwnuho.mongodb.net/")
    // await mongoose.connect("mongodb://localhost:27017/Teodoteca")
    console.log('Conectado ao banco!')
}

main().catch((err)=>console.log(err))

module.exports = mongoose