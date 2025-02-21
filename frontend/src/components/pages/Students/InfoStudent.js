import api from '../../../utils/api'
import imageMen from '../../../assets/img/studentsMen.png'
import imageWomen from '../../../assets/img/studentsWomen.png'
//Hooks
import { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import useFlashMessage from '../../../hooks/useFlashMessage'


import { Context } from '../../../context/Context'

import styles from './InfoStudent.module.css'
import BookViewer from '../../layouts/BookViewr'
import NoAuth from '../../layouts/NoAuth'

function InfoStudent() {

    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const [student, setStudent] = useState({})
    const [myBooks, setMyBooks] = useState([])
    const { authenticaded } = useContext(Context)

    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {


        api.get(`/student/${id}`)
            .then((response) => {
                setStudent(response.data.student)
            })
            .catch((error) => {

                setStudent(error.response.data)
            })



        api.get(`/book/mybooks/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setMyBooks(response.data.myBooks)
            setLoading(true)
        }).catch((error) => {
            setStudent(error.response.data)
        })


    }, [id, token, loading])




    async function FinalizeLoan(Id_book, studentid) {

        let msgType = 'sucess'

        const data = await api.patch(`/loan/return/book/${Id_book}`, { studentid }, {
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
        setLoading(false)
    }

    async function DeleteStudent() {

        let msgType = 'sucess'

        const data = await api.delete(`student/${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }})
            .then((resposne) => {
                return resposne.data
            }).catch((error) => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)

        if (msgType !== 'error') {
            navigate('/viewstudents')
        }
    }

    return (
        <section className={styles.student_section}>
            {authenticaded ? (<>



                <p><Link className='go_back' to='/viewstudents'>Voltar</Link></p>

                {student.name ? (

                    <div >
                        <article className={styles.info_student_container}>
                            <div>
                                {student.gender === 'Masculino' ?
                                    (<img src={imageMen} alt={student.name} />) :
                                    (<img src={imageWomen} alt={student.name} />)
                                }
                                <div>

                                    <div className={styles.actions}>
                                        <h1>{student.name} </h1>
                                        <Link to={`/editstudent/${student._id}`}>Editar</Link>
                                        <button onClick={() => { DeleteStudent() }}>Excluir</button>
                                    </div>
                                    <div className={styles.student_info}>
                                        <div>
                                            <p><span className='bold'>CPF:</span>{student.cpf}</p>
                                            <p><span className='bold'>Sexo:</span>{student.gender}</p>
                                            <p><span className='bold'>Matrícula:</span>{student.student_registration}</p>
                                        </div>
                                        <div>
                                            <p><span className='bold'>Telefone:</span><Link to={`http://wa.me/${student.phone}`} target='_blank'>{student.phone}</Link></p>
                                            <p><span className='bold'>E-mail:</span>{student.email}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </article>
                        <div>

                            <h1>Livros adiquiridos</h1>

                            {myBooks ? (
                                <BookViewer Books={myBooks} studentInfo={id} HandleOnchange={FinalizeLoan} />
                            ) : (
                                <p>carregando...</p>
                            )}

                        </div>
                    </div>
                ) : (
                    <h1 className='db_error'>{student.message}</h1>
                )}
            </>) : (<NoAuth />)}
        </section>
    )
}

export default InfoStudent
