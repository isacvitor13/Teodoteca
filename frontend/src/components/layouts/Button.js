import styles from './Button.module.css'
// import { useState } from 'react'
// import { AiOutlineLoading } from "react-icons/ai";
function Button({ type, width, text, handleClickSubmit, handleClick }) {
    console.log(handleClick)
    // const [buttonClicked, setButtonClicked] = useState(handleClickSubmit)
    return (
        <div className={styles.button__container}>


            <button  disabled={handleClick} type={type}>{text}</button>


            {/* {handleClick ?
            <button onClick={()=>handleClickSubmit(false)} type={type}>{text}</button>:
            <button type='button' ><AiOutlineLoading/></button>
            } */}
        </div>
    )
}
export default Button