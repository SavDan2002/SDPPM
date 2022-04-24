import React, {useState} from 'react'
import PropTypes from 'prop-types'

const styles = {
    div: {
        width: '650px' //костыль
    }
}

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value),
            placeholder: "Введите количество игроков",
            fontSize: '100px'
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function Create(props) {
    const input = useInputValue()

    function submitCode(event) {
        event.preventDefault()

        let number = Number.parseInt(input.value().trim())
        if (number >= 2 && number <= 10) {
            props.onConnect(number)
        } else {
            props.setModalActive(true)
        }
        input.clear()
    }

    return (
        <div className='block' style={styles.div}>
            <form onSubmit={submitCode}>
                <p>To create a game click create</p>
                <input {...input.bind} /><br/>
                <button className='button' type='submit'>create</button>
            </form>
        </div>)

}

Create.propTypes = {
    onConnect: PropTypes.func.isRequired,
    name: PropTypes.string,
    setModalActive: PropTypes.func.isRequired
}

export default Create