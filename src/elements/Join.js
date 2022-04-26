import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Modal from "../Modal/Modal";

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
            placeholder: "Код для подключения",
            fontSize: '100px',
            size: '23'
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function Join(props) {
    const input = useInputValue()

    const [modalJoinActive, setModalJoinActive] = React.useState(false)
    const [error, setError] = React.useState('')

    function submitCode(event) {
        event.preventDefault()

        let code = Number.parseInt(input.value().trim())
        if (!isNaN(code)) {
            props.onJoin(code)
        } else {
            //props.setErrorActive(true)
            setError('Код может состоять только из цифр!')
        }
        input.clear()
    }

    return (
        <div style={styles.div}>
            <button onClick={() => setModalJoinActive(true)}>JOIN GAME</button>
            <Modal active={modalJoinActive} setActive={setModalJoinActive}>
                <form style={{marginBottom: '1rem'}} onSubmit={submitCode}>
                    <p>Username: {props.name}</p>
                    <p style={styles.error}>{error}</p>
                    <input {...input.bind} /><br/>
                    <button className='button' type='submit'>join</button>
                    &nbsp;&nbsp;
                    <button className='button' onClick={() => setModalJoinActive(false)}>cancel</button>
                </form>
            </Modal>
        </div>
    )
}

Join.propTypes = {
    onJoin: PropTypes.func.isRequired,
    name: PropTypes.string,
}

export default Join