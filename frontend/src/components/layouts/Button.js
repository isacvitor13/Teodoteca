import styles from './Button.module.css'
// import { useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai";
function Button({ type, text, handleClick }) {
    return (
        <div className={styles.button__container}>




            {!handleClick ?
                <button disabled={handleClick} type={type}>{text}</button> :
                <button type='button' ><span className={styles.roda}><AiOutlineLoading /></span></button>
            }
        </div>
    )
}
export default Button