import Input from './Input'

import { useState } from 'react'
import styles from './FormContainer.module.css'
function BookForm({ HandleOnChange, msgButton, bookdata }) {

    const [book, setBook] = useState(bookdata || '')


    function HandleChange(e) {
        setBook({ ...book, [e.target.name]: e.target.value })
    }

    function HandleSubmit(e) {
        e.preventDefault()
        HandleOnChange(book)
    }

    return (
        <section className={styles.form_container}>
            <form onSubmit={HandleSubmit} >
                {book.image ? (
                    <div>
                        <img src={book.image} alt={book.name} />

                        <input type='hidden' value={book.image} />
                        <div />
                    </div>) : (
                    <p>Não possuí imagem!</p>
                )}
                <div>
                    <Input
                        text='Nome*'
                        name='name'
                        type='text'
                        value={book.name || ''}
                        HandleOnChange={HandleChange}
                        placeholder='Insira o nome:'
                    />
                    <Input
                        text='Autor*'
                        name='author'
                        type='text'
                        value={book.author || ''}
                        HandleOnChange={HandleChange}
                        placeholder='Insira o nome do autor:'

                    />

                    <Input
                        text='Descrição'
                        name='descripition'
                        type='text'
                        value={book.descripition || ''}
                        HandleOnChange={HandleChange}
                        placeholder='Insira uma breve descrição:'


                    />

                    <Input
                        text='ISBN*'
                        name='isbn'
                        type='number'
                        value={book.isbn || ''}
                        HandleOnChange={HandleChange}
                        placeholder='Insira o ISBN do livro:'
                    />
                    <Input
                        text='Quantidade*'
                        name='amount'
                        type='number'
                        value={book.amount || ''}
                        HandleOnChange={HandleChange}
                        placeholder='Insira a quantidade deste livro::'
                    />
                </div>
                    <button type='submit'  >{msgButton}</button>
            </form>
        </section>
    )
}
export default BookForm