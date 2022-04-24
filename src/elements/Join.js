import React, {useState} from 'react'
import PropTypes from 'prop-types'

const styles = {
    div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        birderRadius: '4px',
        marginBottom: '.5rem',
        marginRight: '1rem',
        float: 'left'
    }
}

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value),
            placeholder: "Код для подключения",
            fontSize: '100px'
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function Join(props) {
    const input = useInputValue()

    function submitCode(event) {
        event.preventDefault()

        if (input.value().trim()) {
            props.onJoin(input.value())
            input.clear()
        }

        props.onJoin()

    }

    return (
        <div className='block' style={styles.div}>
            <form style={{marginBottom: '1rem'}} onSubmit={submitCode}>
                <p>Write game code to join</p>
                <input {...input.bind} /><br/>
                <button className='button' type='submit'>join</button>
            </form>
        </div>
    )
}

Join.propTypes = {
    onJoin: PropTypes.func.isRequired,
    name: PropTypes.string
}

export default Join