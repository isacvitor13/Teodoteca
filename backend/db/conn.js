const mongoose = require('mongoose')

async function main(){
    //conecta ao banco de dados 
    await mongoose.connect("mongodb+srv://isac24vitor:AGE24b9HddhyXJ9y@cluster0.k9wve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    // await mongoose.connect("mongodb://localhost:27017/Teodoteca")
    console.log('Conectado ao banco!')
}

main().catch((err)=>console.log(err))

module.exports = mongoose