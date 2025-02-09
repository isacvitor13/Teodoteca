import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage.js'

import BookForm from '../../forms/BookForm.js'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Create.module.css'
import { Context } from '../../../context/Context.js'
import NoAuth from '../../layouts/NoAuth.js'
function CreateBook() {

    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const { authenticaded } = useContext(Context)
    const navigate = useNavigate()

    async function Create(book) {
        let msgType = 'sucess'
        const data = await api.post('/book/create', book, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
        })
        setFlashMessage(data.message, msgType)
        if (msgType !== 'error') {
            navigate('/viewbooks')
        }
    }


    return (
        <section className={styles.create}>
            {authenticaded ? (<>
                <h1>Cadastrar Livro</h1>
                <BookForm msgButton='Cadastrar' HandleOnChange={Create} /* bookdata={book}*/ />
            </>) : (<NoAuth />)}
        </section>
    )

}
export default CreateBook