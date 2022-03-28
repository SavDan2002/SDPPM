import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Connect({ onConnect }) {

const [value, setValue] = useState('')

function submitCode(event) {
    event.preventDefault()

    if (value.trim()) {
        onConnect(value)
        setValue('')
    }
}
return (
<form style={{ marginBottom: '1rem' }} onSubmit={submitCode}>
    <input value={value} onChange={event => setValue(event.target.value)}/><br />
    <button type='submit'>connect</button>
</form>)

}

Connect.propTypes = {
    onConnect: PropTypes.func.isRequired
}

export default Connect