import api from '../../../utils/api'

//hooks
import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import useDate from '../../../hooks/useDate'
import useFlashMessage from '../../../hooks/useFlashMessage'
//compponentes
import ImageBookExample from '../../../assets/img/ExampleBook.png'
import ImageStudent from '../../../assets/img/student.png'

import styles from './InfoBook.module.css'
import { Context } from '../../../context/Context'
import NoAuth from '../../layouts/NoAuth'

function InfoBook() {


    const { date } = useDate()
    const { Return_Date } = useDate()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const { id } = useParams()
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(false)
    const [token] = useState(localStorage.getItem('token') || '')
    const { authenticaded } = useContext(Context)

    useEffect(() => {
        api.get(`/book/${id}`)
            .then((response) => {
                setBook(response.data.book)
                setLoading(false)
            }).catch((error) => {
                setBook(error.response.data)
            })
    }, [id, loading])

    async function FinalizeLoan(bookid, studentid,) {

        let msgType = 'sucess'

        const data = await api.patch(`loan/return/book/${bookid}`, { studentid }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setLoading(true)
                return response.data
            })
            .catch((error) => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)
    }

    async function DeleteBook(id) {
        let msgType = 'sucess'

        const data = await api.delete(`book/${id}`, {
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
        <section className={styles.info_section}>

            {authenticaded ? (<>
                {book.name ? (
                    <div>
                        <div className={styles.info_container}>

                            {book.image ? (

                                <img src={book.image} alt={book.name} />

                            ) : (

                                <img src={ImageBookExample} alt={book.name} />

                            )}
                            <div>

                                <h1>{book.name}</h1>

                                <div>

                                    <p><span className='bold'>Autor:</span>{book.author}</p>

                                    <p><span className='bold'>Descrição:</span>{book.descripition ? (
                                        <>{book.descripition}</>
                                    ) : (

                                        <>Não possui descrição!</>

                                    )}</p>

                                    <p><span className='bold'>ISBN:</span>{book.isbn}</p>

                                </div>

                                <div>
                                    <p><span className='bold'>Quantidade:</span>{book.amount}</p>
                                    <p><span className='bold'>Quantidade emprestada:</span>{book.loaned.length} de {book.amount}</p>
                                </div>


                            </div>

                            <div className={styles.actions_book}>
                                <Link to={`/book/edit/${book._id}`}>Editar</Link>
                                <button onClick={() => { DeleteBook(book._id) }}>Excluir</button>
                                {book.loan ? <></> : <Link to={`/book/loan/${book._id}`}>Emprestar  </Link>}
                            </div>

                        </div>

                        <article className={styles.students}>

                            <h2>Alunos com este Livro</h2>

                            {book.loaned.length > 0 ? (
                                <>
                                    {book.loaned.length > 0 && (<>
                                        {book.loaned.map((student, index) => (

                                            <div key={`${student._id}${index}`}>

                                                <div className={styles.student_header}>

                                                    <img src={ImageStudent} alt={student.name} />

                                                    <div>

                                                        <h3><Link to={`/student/${student.id}`}>{student.name}</Link></h3>

                                                        <p>
                                                            <span className='bold'>Telefone:</span>
                                                            <Link to={`http://wa.me/${student.phone}`} target='_blank'>{student.phone}</Link>
                                                        </p>

                                                        <button onClick={() => { FinalizeLoan(book._id, student.id) }}>Finalizar empéstimo</button>

                                                        {Return_Date(student.date).loan_expired ?
                                                            <p className={styles.expired}>{Return_Date(student.date).message}</p> :
                                                            <p className={styles.no_expired}>{Return_Date(student.date).message}</p>
                                                        }

                                                        <p className={styles.servant}>Emprestado por {student.servant}</p>

                                                    </div>
                                                </div>
                                            </div >
                                        ))}</>
                                    )}

                                </>
                            ) : (<p>Não possui empréstimo!</p>)}

                        </article>
                        <article>

                            <details>
                                <summary> Histórico de empréstimos</summary>
                                {book.loan_history ? (

                                    <div className={styles.student_header}>
                                        {book.loan_history.map((student, index) => (

                                            <div key={`${index}${student._id}`} className={styles.student_header}>

                                                <img src={ImageStudent} alt={student.name} />

                                                <div>

                                                    <h3>{student.name}</h3>
                                                    <p>
                                                        <span className='bold'>Telefone:</span>
                                                        <Link to={`http://wa.me/${student.phone}`}>{student.phone}</Link>
                                                    </p>

                                                    <p className={styles.servant}>Emprestado por {student.servant}</p>

                                                    <p className={styles.servant} >Devolvido em {date(student.date)}</p>

                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                ) : (
                                    <p>Este livro ainda não foi emprestado!</p>
                                )}


                            </details>


                        </article>

                    </div>
                ) : (
                    <h1 className='db_error'>{book.message}</h1>
                )}

            </>) : (<NoAuth />)}
        </section>
    )
}
export default InfoBook