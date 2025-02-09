import styles from './Input.module.css'
function Input({ text, type, name, placeholder, HandleOnChange, value, max, focus, pattern, disable,required }) {
    return (
        <div className={styles.input_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={HandleOnChange}
                value={value}
                maxLength={max}
                autoFocus={focus}
                pattern={pattern}
                // required={required}
                disabled={disable}
            />
        </div>
    )
}
export default Input