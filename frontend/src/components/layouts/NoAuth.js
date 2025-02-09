import styles from './NoAuth.module.css'
import { Link } from 'react-router-dom'
function NoAuth() {

    return (

        <div className={styles.noAuth}>
            <h1>Faça <Link to='/login'>Login</Link></h1>
        </div>

    )
}

export default NoAuth