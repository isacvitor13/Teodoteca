import api from '../utils/api'
import { useEffect, useState } from 'react'
import useFlashMessage from './useFlashMessage'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
    const [loading, setLoading] = useState(false)
    const [authenticaded, setAuthenticaded] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticaded(true)
        }
        setLoading(true)


    }, [loading])






    async function login(servant) {
        let msgType = ''
        let msg = ''

        try {

            const data = await api.post('/servant/login', servant).then((response) => {
                return response.data
            })
            authServant(data)
            msg = data
            msgType = 'sucess'

        } catch (error) {
            msgType = 'error'
            msg = error.response.data


        }

        setFlashMessage(msg.message, msgType)

    }

    async function authServant(data) {
        localStorage.setItem('token', JSON.stringify(data.token))
        setAuthenticaded(true)
        setLoading(true)
        navigate('/')

    }
    async function logout() {
        localStorage.removeItem('token')
        setAuthenticaded(false)
        setLoading(true)
        navigate('/')
        setFlashMessage('Deslogado', 'sucess')

    }
    return { authenticaded, login, logout }

}