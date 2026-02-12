import api from '../../../utils/api'
//componentes       
import StudentForm from '../../forms/StudentForm'
import NoAuth from '../../layouts/NoAuth'

//hooks
import { useState, useContext } from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useNavigate } from 'react-router-dom'

import { Context } from '../../../context/Context'

import styles from './CreateStudent.module.css'

function CreateStudent() {
    const { authenticaded } = useContext(Context)

    const [token] = useState(localStorage.getItem('token' || ''))

    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const [createSucess, setCreateSucess] = useState(false)

    async function HandleOnSubmit(student) {
        setCreateSucess(true)
        let msgType = 'sucess'

        const data = await api.post('/student/create', student, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {

            return response.data

        }).catch((error) => {
            setCreateSucess(false)
            msgType = 'error'
            return error.response.data
        })


        setFlashMessage(data.message, msgType)
        if (msgType !== 'error') {
            navigate('/viewstudents')
        }

    }



    return (
        <section className={styles.create}>
            {authenticaded ? (<>
                <div>
                    <h1>Cadastrar aluno</h1>
                    <StudentForm msgButton='Cadastrar aluno' HandleSubmit={HandleOnSubmit} CreateStudentSucess={createSucess} />
                </div>
            </>) : (<NoAuth />)}

        </section>
    )
}

export default CreateStudent