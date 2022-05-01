import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate()

    const [modalCreateActive, setModalCreateActive] = React.useState(false)
    const [error, setError] = React.useState('')

    function submitCode(event) {
        event.preventDefault()

        let number = Number.parseInt(input.value().trim())
        if (number >= 2 && number <= 10) {
            navigate('/game', {replace: true, state: {name: props.name, numberOfPlayers: number, code: -1}})
        } else {
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
                    <button className='button' onClick={() => setModalCreateActive(false)}>cancel</button> {/*Почему-то при нажатии отправляет код*/}
                </form>
            </Modal>
        </div>)

}

Create.propTypes = {
    name: PropTypes.string.isRequired
}

export default Create