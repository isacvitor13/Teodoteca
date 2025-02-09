import { useState, useContext } from "react"
import Input from "../../forms/Input"
import { Context } from "../../../context/Context"
import styles from './Login.module.css'
function Login() {
    const [servant, setServant] = useState({})
    const { login } = useContext(Context)
    function HandleChange(e) {
        setServant({ ...servant, [e.target.name]: e.target.value })
        
    }
    function HandleSubmit(e) {
        e.preventDefault()
        login(servant)
    }

    

    return (
        <section className={styles.login}>
            <form onSubmit={HandleSubmit}>
            <h1>Entrar</h1>
                <Input
                    type='email'
                    name='email'
                    text='Email'
                    placeholder='Digite seu email'
                    HandleOnChange={HandleChange}

                />
                <Input
                    type='password'
                    name='password'
                    text='Senha'
                    placeholder='Digite sua senha'
                    HandleOnChange={HandleChange}

                />
                <input type="submit" value='Entrar' />
            </form>
        </section>
    )
}

export default Login