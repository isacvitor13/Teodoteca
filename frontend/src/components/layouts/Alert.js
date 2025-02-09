import { CiSquareInfo } from "react-icons/ci";
import styles from './Alert.module.css'
function Alert({ title, text }) {
    return (


        <aside className={styles.info}>
            <h3><CiSquareInfo />{title}</h3>
            <p>{text}</p>
        </aside>
    )

}
export default Alert