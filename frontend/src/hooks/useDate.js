export default function useDate() {

    function Expired_Date(loaned) {
        let expired = false

        // percorre todo o array de usuários
        loaned.map((student) => {

            //busca a variavél loan_expired que indica se o livro possuí algum empréstimo com prazo estourado
            const { loan_expired } = Return_Date(student.date)

            // compara se  há livros com prazo expirado e caso haja define o livro com prazo expirado
            if (loan_expired === true) {
                expired = true
            }
            return null
        })
        return expired
    }

    const Return_Date = (date) => {

        // Cria a data do emprestimo
        const loan_day = new Date(date)

        //cria a data de retorno do livro
        let Returning = loan_day.setMonth(loan_day.getMonth() + 4)
        const dateReturning = new Date(Returning)

        // Pega dia, mês e ano acrescentando 0 à esquerda do número de dia e mês que forem menor que 10 
        const day = dateReturning.getDate() > 10 ? dateReturning.getDate() : `0${dateReturning.getDate()}`
        const moth = dateReturning.getMonth() + 1 > 10 ? dateReturning.getMonth() : `0${dateReturning.getMonth()}`
        const FullYear = dateReturning.getFullYear()


        // const actualy_day = new Date(2025, 6, 31)
        //Pega a data Atual
        const actualy_day = new Date()

        /* Compara se a data atual é maoir do que a data de devolução, caso seja, retorna que o
         prazo foi extrapolado, caso contrario retorna a data de devolução*/
        let loan_expired = false
        if (actualy_day < dateReturning) {
            return { message: `Devolver em ${day}/${moth}/${FullYear}`, loan_expired }
        } else if (actualy_day > dateReturning) {
            loan_expired = true
            return { message: `Prazo de devolução excedido!`, loan_expired }
        }
    }

    const date = (data) => {

        // cria a data de devolução
        let newdate = new Date(data)

        // pega o dia da devolução, caso o dia seja menor que 10 acrescenta um 0 a sua esquerda
        const Day = newdate.getDate() > 10 ? newdate.getDate() : `0${newdate.getDate()}`

        /* pega o mês da devolução, e caso o número do mês seja menor que 10 acrescenta um 0 a sua esquerda e 
         soma mais 4 meses( 3 meses que é o periodo de leitura e mais 1 para nivelar a variavel new Date 
        já que os meses começam do 0 ao 11)*/
        const Month = newdate.getMonth() + 1 > 10 ? newdate.getMonth() + 4 : `0${newdate.getMonth() + 4}`

        // pega o ano da devolução
        const FullYear = newdate.getFullYear()

        //retorna uma string com a data formada
        return `${Day}/${Month}/${FullYear}`
    }

    return { date, Return_Date, Expired_Date }
}