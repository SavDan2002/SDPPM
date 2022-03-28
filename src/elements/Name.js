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
    <div>
      <h3>Name: </h3>
      <form style={{marginBottom: '1rem'}} onSubmit={submitName}> 
        <input type='text' value={value} onChange={event => setValue(event.target.value)} />
        {console.log(value)}
        <button type='submit'>setName</button>
      </form>
    </div>
  )
}

Name.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Name;