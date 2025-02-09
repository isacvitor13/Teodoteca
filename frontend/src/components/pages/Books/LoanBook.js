import api from "../../../utils/api"
import ImagemMen from '../../../assets/img/studentsMen.png'
import ImagemWomen from '../../../assets/img/studentsWomen.png'

//hooks
import useFlashMessage from "../../../hooks/useFlashMessage"
import { useEffect, useMemo, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { Context } from '../../../context/Context'


//componentes
import BookViewer from "../../layouts/BookViewr"
import { FaArrowRightLong } from "react-icons/fa6";
import NoAuth from '../../layouts/NoAuth'


import styles from './LoanBook.module.css'
function LoanBook() {

    const { id } = useParams()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const { authenticaded } = useContext(Context)
    const [book, setBooks] = useState({})
    const [students, setStudents] = useState({})
    const [student, setStudent] = useState({})
    const [studentid, setStudentId] = useState('')
    const [searchStudent, setSearchStudent] = useState('')
    const [step, setStep] = useState(0)

    useEffect(() => {
        api.get(`/book/${id}`).then((response) => {
            setBooks(response.data.book)
        }).catch((error) => {
            setBooks(error.response.data)
        })
        api.get('/student/all').then((response) => {
            setStudents(response.data.Students)
        })

    }, [id])

    const studentsFilter = useMemo(() => {
        if (searchStudent.length > 0) {
            return students.filter((student) =>
                student.name.toLowerCase().includes(searchStudent.toLowerCase())
            )

        } else {
            return students
        }

    }, [searchStudent, students])

    function GetStudent(student) {
        setStep(2)
        setStudentId({ studentid: student._id })
        setStudent(student)
    }


    async function LoanBookById() {

        let msgType = 'sucess'

        const data = await api.patch(`/loan/${id}`, studentid, {

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
            navigate(`/book/${id}`)
        }
    }

    return (
        <section className={styles.loan}>

            {authenticaded ? (<>


                {book.name ? (<>

                        <div className={styles.step}>
                            {step === 0 && <div></div>}
                            {step === 1 && (<>
                                <div></div>
                                <div></div>
                            </>)}
                            {step === 2 && (<>
                                <div></div>
                                <div></div>
                                <div className={styles.end_step}></div>
                            </>)}
                        </div>
                        {step === 0 && (
                            <article className={styles.book_loan}>

                                <h2>Emprestar :</h2>
                                <div>
                                    {book.name && (< BookViewer Books={[book]} viewbook={'yes'} />)}

                                    <button className={styles.actions_loan} onClick={() => setStep(1)}>Avançar <FaArrowRightLong /></button>
                                </div>
                            </article>
                        )}


                        {step === 1 && (<>
                            <div className={styles.select_student_header}>

                                <button className="go_back" onClick={() => setStep(0)}>Voltar</button>

                                <div>
                                    <h2>Para:</h2>
                                    <input placeholder='Procure o aluno por aqui' onChange={(e) => setSearchStudent(e.target.value)} />
                                </div>
                            </div>
                            {studentsFilter.length > 0 ? (
                                <div className={styles.select_student}>

                                    {studentsFilter.map((student) => (

                                        <div className={styles.selected_student} key={student._id}>

                                            {student.gender === 'Masculino' ? (
                                                <img src={ImagemMen} alt={student.gender} />) : (
                                                <img src={ImagemWomen} alt={studentid.gender} />)}

                                            <h4>{student.name}</h4>

                                            <p>{student.student_class.class_acronym}</p>

                                            <button className={styles.actions_loan} onClick={() => GetStudent(student)}>Selecionar aluno</button>
                                        </div>
                                    ))}
                                </div>


                            ) : (
                                <p>Nenhum usuário encontrado! </p>
                            )}

                        </>)}

                        {step === 2 && (

                            <div className={styles.confirm_loan} id="confirm">
                                <h2>Confirmar empréstimo</h2>
                                <div>
                                    <button onClick={() => setStep(1)}>Voltar</button>
                                    <button onClick={() => LoanBookById()}>Emprestar</button>
                                </div>
                                <div>
                                    < BookViewer Books={[book]} />

                                    <span> <FaArrowRightLong /></span>

                                    <div>
                                        {student.gender === 'Masculino' ? (
                                            <img src={ImagemMen} alt={student.name} />) : (
                                            <img src={ImagemWomen} alt={student.name} />
                                        )}

                                        <p> {student.name}</p>
                                        <p> {student.student_class.class_acronym}</p>
                                    </div>
                                </div>

                            </div>
                        )}
                    </>) : (

                        <h1 className='db_error'>{book.message}</h1>
                    )
                }
            </>) : (<NoAuth />)}

        </section>
    )
}

export default LoanBook