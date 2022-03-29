import React, {useState} from 'react'
import PropTypes from 'prop-types'

function Name({onChange}) {

    const [value, setValue] = useState('')

    function submitName(event) {
        event.preventDefault()

        if (value.trim()) {
            onChange(value)
        }
    }

    return (
        <div style={{
            background: '#7851a9',
            padding: '.5rem 1rem',
            width: '290px',
            marginBottom: '.5rem',
            borderRadius: '8%'
        }}>
            <form onSubmit={submitName}>
                <p>Name: </p>
                <input type='text' placeholder="Ваше имя" value={value}
                       onChange={event => setValue(event.target.value)}/>
                &nbsp;
                <button className='button' type='submit'>setName</button>
            </form>
        </div>
    )
}

Name.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Name;