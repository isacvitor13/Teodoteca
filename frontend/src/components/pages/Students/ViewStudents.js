import api from '../../../utils/api'
import studentsMen from '../../../assets/img/studentsMen.png'
import studentsWomen from '../../../assets/img/studentsWomen.png'

import styles from './ViewStudents.module.css'

//hooks
import { useEffect, useState, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../../context/Context'
//componentes
import NoAuth from '../../layouts/NoAuth'
import { FaRegPlusSquare } from 'react-icons/fa'


function ViewStudents() {
    const { authenticaded } = useContext(Context)
    const [students, setStudents] = useState({})
    const [searcTerm, setSearchTerm] = useState('')

    useEffect(() => {
        api.get('/student/all').then((response) => {
            setStudents(response.data.Students)

        })
    }, [])

    const studentsFiltered = useMemo(() => {
        if (searcTerm.length > 0) {
            return students.filter((student) => student.name.toLowerCase().includes(searcTerm.toLowerCase()))
        } else {
            return students
        }
    }, [students, searcTerm])

    return (
        <section className={styles.view_students_container}>
            {authenticaded ? (<>

                <div className={styles.no_student}>
                    <h1> Alunos do sistema</h1>
                    <input onChange={(e) => setSearchTerm(e.target.value)} placeholder='Procure pelo aluno por aqui' />
                    <Link to='/createstudent'> Cadastre por aqui  <FaRegPlusSquare /></Link>
                </div>

                {students.length === 0 ? (
                    <div className={styles.no_student}>
                        <h3 >Não há alunos cadastrados</h3>
                    </div>
                ) : (<>

                    {studentsFiltered.length > 0 ? (<>
                        {studentsFiltered.map((student) => (
                            <div key={student._id} className={styles.student}>

                                <div>
                                    {student.gender.toLowerCase() === 'masculino' ?
                                        (
                                            <img src={studentsMen} alt={student.name} />
                                        ) : (
                                            <img src={studentsWomen} alt={student.name} />
                                        )
                                    }
                                    <h2>{student.name}</h2>
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        <p><span className='bold'>Turma: </span>{student.student_class.class_acronym}</p>

                                        <p><span className='bold'>Matrícula: </span>{student.student_registration}</p>
                                    </div>
                                    <p><Link to={`/student/${student._id}`}>Ver aluno</Link></p>

                                </div>
                            </div>
                        ))}
                    </>) : (<div className={styles.no_student}><h3>Nenhum resultado para a busca</h3></div>)}

                </>)}

            </>) : (
                <NoAuth />)}
        </section>
    )
}

export default ViewStudents