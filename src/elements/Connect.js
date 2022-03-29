import React, { useState } from 'react'
import PropTypes from 'prop-types'

const styles = {
    background: '#5d76cb',
    padding: '.5rem 1rem',
    border: '3px solid #000066',
  }

function Connect({ onConnect, name}) {

const [value, setValue] = useState('')

function submitCode(event) {
    event.preventDefault()

    if (value.trim()) {
        onConnect(value)
        setValue('')
    }
}
return (
    <div style={styles}>
        <form onSubmit={submitCode}>
            <h3>Your name: {name ? name : 'anonim'}</h3>
             <input value={value} onChange={event => setValue(event.target.value)}/><br />
             <button className='but' type='submit'>connect</button>
        </form>
    </div>)

}

Connect.propTypes = {
    onConnect: PropTypes.func.isRequired
}

export default Connect