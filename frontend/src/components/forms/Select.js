import styles from './Input.module.css'

function Select({ value, text, options, name, HandleOnChange,FirstOption }) {

    return (


        <div className={styles.input_control}>

            <label htmlFor={name}> {text}:</label>

            <select
                name={name}
                onChange={HandleOnChange}
                id={name}
                value={value || ''}
            >
                <option>{FirstOption}</option>

                {options.map((option) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>

        </div>
    )
}
export default Select