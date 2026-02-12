import api from '../../../utils/api'

//hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useFlashMessage from '../../../hooks/useFlashMessage';

//componentes
import BookForm from "../../forms/BookForm";
import styles from './EditBook.module.css'
import { Context } from '../../../context/Context';
import NoAuth from '../../layouts/NoAuth';
function EditBook() {
    const { id } = useParams()
    const [token] = useState(localStorage.getItem('token') || '')
    const { authenticaded } = useContext(Context)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const [book, setBook] = useState({})
    const [UpdateBookSucess, setUpdateBookSucess] = useState(false)

    useEffect(() => {
        api.get(`/book/${id}`).then((response) => {
            setBook(response.data.book)
        }).catch((error) => {
            setBook(error.response.data)
        })
    }, [id])



    async function UpdateBook(book) {
        setUpdateBookSucess(true)
        let msgType = 'sucess'
        const data = await api.patch(`/book/edit/${id}`, book, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            setUpdateBookSucess(false)
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)

        if (msgType !== 'error') {
            navigate(`/book/${id}`)
        }
    }



    return (
        <section className={styles.edit_book}>
            {authenticaded ? (<>
                <Link className='go_back' to={`/book/${id}`}>Voltar</Link>
                {book.name ? (
                    <>
                        {book.name && (
                            <>
                                <h1>Editando o livro {book.name}</h1>
                                <BookForm
                                    bookdata={book}
                                    HandleOnChange={UpdateBook}
                                    msgButton='Editar'
                                    CreateBookSucess={UpdateBookSucess}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <h1 className='db_error'>{book.message}</h1>
                )}
            </>) : (<NoAuth />)}
        </section>
    )
}
export default EditBook