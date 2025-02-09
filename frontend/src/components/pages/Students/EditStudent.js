import api from '../../../utils/api'
//componentes
import StudentForm from '../../forms/StudentForm'
import Alert from '../../layouts/Alert'
import NoAuth from '../../layouts/NoAuth'

//Hooks
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'

import { Context } from '../../../context/Context'

//css
import styles from './EditStudent.module.css'
function EditStudent() {
    const { authenticaded } = useContext(Context)
    const { id } = useParams()
    const [student, setStudent] = useState({})
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/student/${id}`)
            .then((response) => {
                setStudent(response.data.student)
            }).catch((error) => {
                setStudent(error.response.data)
            })
    }, [id])



    async function UpdateStudent(student) {
        let msgType = 'sucess'

        const data = await api.patch(`student/edit/${id}`, student, {
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
            navigate(`/student/${id}`)
        }
    }


    return (
        <section className={styles.edit_student}>
            {authenticaded ? (<>

                <Link className='go_back' to={`/student/${id}`}>Voltar</Link>
                {student.name ? (<>
                    <h1>Editando {student.name}</h1>
                    <StudentForm studentData={student} msgButton={'Editar'} HandleSubmit={UpdateStudent} />
                    <Alert text='Ao confirmar a edição os dados do aluno serão atualizados em todo o sistema.
                E por motivos de segurança o CPF só poderá ser alterado diretamente no Banco de dados.'
                        title='Atenção' />
                </>
                ) : (
                    <h1 className='db_error'>{student.message}</h1>
                )}

            </>) : (<NoAuth />)}




        </section>
    )
}

export default EditStudent