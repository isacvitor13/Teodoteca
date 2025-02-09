import api from '../../../utils/api'

//hooks
import { useState, useEffect, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../../context/Context'

//componentes
import NoAuth from '../../layouts/NoAuth'
import BookViewer from '../../layouts/BookViewr'
import { FaRegPlusSquare } from "react-icons/fa";

import styles from './ViewBooks.module.css'

function ViewBooks() {
    const { authenticaded } = useContext(Context)
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    // const [booksFiltered, setBooksFiltered] = useState([])

    useEffect(() => {
        api.get('/book/booksall').then((response) => {
            setBooks(response.data.Books)
        })
    }, [])

    const FilteredBooks = useMemo(() => {
        if (searchTerm.length > 0) {
            return books.filter((book) => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
        } else {
            return books
        }

    }, [searchTerm, books])

    return (
        <section className={styles.view_container}>
            {authenticaded ? (
                <>
                    <div className={styles.bookviewer_header}>

                        <h1>Livros</h1>
                        <input onChange={(e) => { setSearchTerm(e.target.value) }} placeholder='Procure pelo livro aqui' />
                        <Link to='/book/create'>Cadastrar Livro <FaRegPlusSquare /></Link>

                    </div>
                    {books.length !== 0 ? (<>
                        {FilteredBooks.length !== 0 ? (

                            <article>
                                <BookViewer Books={FilteredBooks} />
                            </article>
                        ) : (<h3>Nenhum resultado para a busca</h3>)}

                    </>
                    ) : (
                        <h3>Nenhum livro cadastrado</h3>
                    )}
                </>) : (<NoAuth />)}
        </section>)
}

export default ViewBooks