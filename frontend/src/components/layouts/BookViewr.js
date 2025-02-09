
import ExampleBook from '../../assets/img/ExampleBook.png'
import styles from './BookViewer.module.css'

//hooks
import { Link } from 'react-router-dom'
import useDate from '../../hooks/useDate'

function BookViewer({ Books, studentInfo, HandleOnchange, viewbook }) {
    const { Expired_Date } = useDate()

    return (
        <>

            {Books.map((book) => (
                <div key={book._id} className={styles.book_container} >

                    {book.image ? (
                        <div className={styles.info_book} style={{ backgroundImage: `url(${book.image})` }}>
                            <h3>{book.name}</h3>
                        </div>
                    ) : (
                        <div className={styles.info_book} style={{ backgroundImage: `url(${ExampleBook})` }}>
                            <h3>{book.name}</h3>
                        </div>
                    )}


                    <div className={styles.actions}>

                        <div>
                            {viewbook ? '' : <Link to={`/book/${book._id}`}>Ver Livro </Link>}

                            {studentInfo ? (<>
                                <button onClick={() => { HandleOnchange(book._id, studentInfo) }}>Devolver</button>
                            </>) : (<>
                                {book.loan ? (<span className={styles.loan}>Emprestado</span>) : (
                                    <Link to={`/book/loan/${book._id}`}>Disponivel</Link>)}
                            </>)}

                        </div>
                        <p>{Expired_Date(book.loaned) ? (<>Prazo de Devolução expirado!</>) : ''}</p>

                    </div>
                </div>
            ))
            }
        </>
    )
}
export default BookViewer