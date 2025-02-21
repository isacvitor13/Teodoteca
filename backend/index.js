const express = require('express')
const cors = require('cors')

const app = express()

// app.use(cors())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.static('public'))


const ServantRouter = require('./routes/ServantRouter')
app.use('/servant', ServantRouter)
//Rotas dos estudantes
const StudentRouter = require('./routes/StudentRouter')
app.use('/student', StudentRouter)

//Rotas dos livros 
const BookRouter = require('./routes/BookRouter')
app.use('/book', BookRouter)

//Rotas para empréstimo
const LoanRouter = require('./routes/LoanRouter')
app.use('/loan', LoanRouter)

//Rotas para turmas
const Classroons = require('./routes/ClassroonsRouter')
app.use('/class', Classroons)

app.listen(9001, () => console.log('Rodando!'))
