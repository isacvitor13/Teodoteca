import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../assets/img/teste.png'
import { useContext } from 'react'
import { Context } from '../../context/Context'

function NavBar() {


    const { authenticaded, logout } = useContext(Context)
    // console.log(authenticaded)
    return (
        <nav className={styles.navbar}>
            <div>
                <img src={logo} alt='TEODOTECA' />
                <h2>TEODOTECA</h2>
            </div>
            <ul>
                {!authenticaded && (
                    <li><Link to='/login'>Entrar</Link></li>
                )}
                {authenticaded && (<>
                   
                    <li><Link to='/'>Inicio</Link></li>
                    <li><button onClick={logout}>Sair</button></li>
                </>
                )}
            </ul>
        </nav>
    )
}
export default NavBar