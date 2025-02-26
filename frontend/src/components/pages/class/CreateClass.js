import api from '../../../utils/api'

//hooks
import { useEffect, useState, useContext } from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useNavigate } from 'react-router-dom'


import { Context } from '../../../context/Context'

//Components
import Select from '../../forms/Select'
import NoAUth from '../../layouts/NoAuth'
import styles from './CreateClass.module.css'
import Button from '../../layouts/Button'

function CreateClass() {
    const { authenticaded } = useContext(Context)
    const [school_class, setSchool_class] = useState({})
    const [classes, setClasses] = useState([])
    const [buttonCLicked, setButtonClicked] = useState(false)

    const [token] = useState(localStorage.getItem('token'))
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()


    const period = ['EF', 'EM']
    const yearEF = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const yearEM = [1, 2, 3]
    const bout = ['Manhã', 'Tarde', 'Integral']
    const letterClass = ['A', 'B', 'C', 'D', 'E']


    useEffect(() => {
        api.get('/class/getclass').then((response) => {
            setClasses(response.data.classroons)
        })
    }, [])



    function HandleSelect(e) {
        setSchool_class({ ...school_class, [e.target.name]: e.target.options[e.target.selectedIndex].text })
    }

    async function HandleOnSubmit(e) {
        e.preventDefault()
        setButtonClicked(true)
        let msgType = 'sucess'

        const classroonsStructure = {
            classroons: `${school_class.year}${school_class.letter}º ano ${school_class.period} ${school_class.bout}`
        }

        const data = await api.post('/class/create', classroonsStructure, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            msgType = 'error'


            setButtonClicked(false)


            return error.response.data
        })

        if (msgType !== 'error') {
            navigate('/')
        }
        setFlashMessage(data.message, msgType)
    }

    async function RemoveClass(id) {

        let msgType = 'sucess'
        const data = await api.delete(`/class/remove/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                const UpdateClass = classes.filter((Class) => Class._id !== id)
                setClasses(UpdateClass)
                return response.data
            })
            .catch((error) => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)
    }




    return (
        <section className={styles.addclass}>

            {authenticaded ? (<>

                <h1>Crie uma turma</h1>
                <p>Para cadastrar um aluno é necessário que uma turma esteja inserida no sistema</p>
                <form onSubmit={HandleOnSubmit}>

                    <Select
                        text='Período'
                        name='period'
                        value={school_class.period ? (school_class.period) : (school_class.period = 'EF')}
                        HandleOnChange={HandleSelect}
                        options={period}

                    />
                    <Select
                        text='letra'
                        name='letter'
                        value={school_class.letter ? (school_class.letter) : (school_class.letter = 'A')}
                        HandleOnChange={HandleSelect}
                        options={letterClass}
                    />
                    {school_class.period === 'EF' ? (
                        <Select
                            text='Ano'
                            name='year'
                            HandleOnChange={HandleSelect}
                            options={yearEF}
                            value={school_class.year ? (school_class.year) : (school_class.year = 1)}
                        />

                    ) : (

                        <Select
                            text='Ano'
                            name='year'
                            value={school_class.year > 3 ? (school_class.year = 1) : school_class.year}
                            HandleOnChange={HandleSelect}
                            options={yearEM}
                        />

                    )}
                    <Select
                        text='Turno'
                        name='bout'
                        value={school_class.bout ? (school_class.bout) : (school_class.bout = 'Manhã')}
                        HandleOnChange={HandleSelect}
                        options={bout}
                    />




                    {/* <button  disabled={buttonCLicked} type='submit'>Criar</button> */}




                    <Button
                        type='submit'
                        text='Criar'

                        handleClickSubmit={setButtonClicked}
                        handleClick={buttonCLicked}
                    />
                    {/* <button type='submit'>Criar</button> */}
                </form>


                {classes.length > 0 ? (
                    <div className={styles.classes}>
                        <h1>Turmas já cadastradas</h1>
                        {classes.map((school_class) => (

                            <div key={school_class._id}>
                                <p>{school_class.classroons}</p>
                                <button onClick={() => { RemoveClass(school_class._id) }}>Excluir</button>
                            </div>
                        ))}

                    </div>
                ) : (
                    <p>Não a turmas cadastradas</p>

                )}

            </>) : (<NoAUth />)}



        </section>
    )
}
export default CreateClass