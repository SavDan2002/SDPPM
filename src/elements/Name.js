import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Name({ onChange }) {

    const [value, setValue] = useState('')
    
    function submitName(event){
        event.preventDefault()

        if (value.trim()) {
            onChange(value)
        }
    }

  return (
    <div style={{background: '#7851a9', padding: '.5rem 1rem'}}>
        <h3>Write your name: </h3>
        <form onSubmit={submitName}> 
            <input type='text' value={value} onChange={event => setValue(event.target.value)} />
            &nbsp;
            <button className='but' type='submit'>setName</button>
        </form>
    </div>
  )
}

Name.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Name;