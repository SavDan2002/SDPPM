import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Modal from "../Modal/Modal"

const styles = {
    div: {
    },
    error: {
        float: 'right',
        color: 'red',
        fontSize: '11pt'
    }
}

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value),
            placeholder: "Введите количество игроков",
            fontSize: '100px',
            size: '23'
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function Create(props) {
    const input = useInputValue()

    const [modalCreateActive, setModalCreateActive] = React.useState(false)
    const [error, setError] = React.useState('')

    function submitCode(event) {
        event.preventDefault()

        let number = Number.parseInt(input.value().trim())
        if (number >= 2 && number <= 10) {
            props.onConnect(number)
        } else {
            //props.setErrorActive(true)
            setError('Число игроков должно быть от 2 до 10!')
        }
        input.clear()
    }

    return (
        <div style={styles.div}>
            <button onClick={() => setModalCreateActive(true)}>CREATE GAME</button>
            <Modal active={modalCreateActive} setActive={setModalCreateActive}>
                <form onSubmit={submitCode}>
                    <p>Username: {props.name}</p>
                    <p style={styles.error}>{error}</p>
                    <input {...input.bind} /><br/>
                    <button className='button' type='submit'>create</button>
                    &nbsp;&nbsp;
                    <button className='button' onClick={() => setModalCreateActive(false)}>cancel</button>
                </form>
            </Modal>
        </div>)

}

Create.propTypes = {
    onConnect: PropTypes.func.isRequired,
    name: PropTypes.string,
}

export default Create