import api from '../../utils/api'


//Componentes
import styelsInput from './Input.module.css'
import Input from './Input'
import Select from './Select'

//hooks
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './FormContainer.module.css'


function StudentForm({ msgButton, HandleSubmit, studentData }) {
    const gender = ['Masculino', 'Feminino']
    const [student, setStudent] = useState(studentData || {})
    const [classroons, setClassroons] = useState([])

    useEffect(() => {

        api.get('/class/getclass').then((response) => {
            setClassroons(response.data.classroons)
        })

    }, [])

    function HandleChange(e) {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }



    function HandleSelect(e) {
        setStudent({ ...student, [e.target.name]: e.target.options[e.target.selectedIndex].text })
    }


    function CreateStudent(e) {
        e.preventDefault()
        HandleSubmit(student)
    }
    return (
        <section className={styles.form_container}>

            {classroons && <form onSubmit={CreateStudent}>
                <div>
                    <h3>Informações pessoais: </h3>
                    <Input
                        text='Nome'
                        type='text'
                        name='name'
                        placeholder='Digite o nome do aluno:'
                        HandleOnChange={HandleChange}
                        value={student.name || ''}
                        focus='true'
                    />
                    <Input
                        text='Número da matrícula'
                        type='number'
                        name='student_registration'
                        placeholder='000-0-000'
                        HandleOnChange={HandleChange}
                        value={student.student_registration || ''}
                        pattern={''}
                    />

                    <Input
                        text='CPF'
                        type='text'
                        name='cpf'
                        HandleOnChange={HandleChange}
                        placeholder='000.000.000-00'
                        value={student.cpf || ''}
                        disable={studentData ? true : false}
                    />
                </div>
                <div className={styles.form_select}>
                    <h3>Informações adicionais:</h3>
                    <Select
                        text='Sexo'
                        type='text'
                        name='gender'
                        options={gender}
                        HandleOnChange={HandleSelect}
                        value={student.gender ? (student.gender) : (student.gender = gender[0])}
                    />

                    {classroons.length > 0 ? (
                        <div className={styelsInput.input_control}>
                            <label htmlFor='student_class'>Turma:</label>

                            <select
                                name='student_class'
                                onChange={HandleSelect}
                                id='student_class'
                                value={student.student_class ? (student.student_class) : (student.student_class = classroons[0].class_acronym)}
                            >
                                {classroons.map((classroons, index) => (

                                    <option key={index} value={classroons.class_acronym} id={classroons.class_acronym + index} >{classroons.class_acronym}</option>
                                ))}
                            </select>
                        </div>


                    ) : (
                        <div><p>Nenhuma turma cadastrada. Cadastre uma <Link to='/addclass'>aqui</Link></p></div>
                    )}

                </div>
                <div>
                    <h3>Informações de contato:</h3>
                    <Input
                        text='E-mail'
                        type='email'
                        name='email'
                        placeholder='Digite o e-mail do aluno:'
                        HandleOnChange={HandleChange}
                        value={student.email || ''}
                    />
                    <Input
                        text='Número'
                        type='tel'
                        name='phone'
                        placeholder='(33) 0000-0000'
                        HandleOnChange={HandleChange}
                        value={student.phone || ''}
                    />
                </div>

                <button type='submit'>{msgButton}</button>

            </form>}
        </section>
    )



}

export default StudentForm