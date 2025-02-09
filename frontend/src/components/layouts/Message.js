import bus from '../../utils/bus'
import { useState, useEffect } from 'react'
import styles from './Message.module.css'

function Message() {

    const [visibility, setVisibility] = useState(false)
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        bus.addListener('flash', ({ message, type }) => {

            setType(type)
            setMessage(message)
            setVisibility(true)
            setTimeout(() => {
                setVisibility(false)
            }, 5000)
        })
    }, [])
    return (

        visibility && (<div className={`${styles.message} ${styles[type]}`}>{message}</div>)

    )
}

export default Message