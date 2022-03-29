import React, { useState } from 'react'
import PropTypes from 'prop-types'

const styles = {
  div: {
    display: 'flex',
    background: '#5d76cb',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '3px solid #000066',
    birderRadius: '4px',
    marginBottom: '.5rem'
  },
}

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)
  const classes = []

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}

function Join (props) {
  const input = useInputValue('')

  function submitCode(event) {
    event.preventDefault()

    if (input.value().trim()) {
     props.onJoin(input.value())
     input.clear()
    }
  }
  return (
    <div style={styles.div}>
      <form style={{ marginBottom: '1rem' }} onSubmit={submitCode}>
        <h3>Your name: {props.name ? props.name : 'anonim'}</h3>
        <input {...input.bind} /><br />
        <button className='but' type='submit'>join</button>
      </form>
    </div>
  )
}

Join.propTypes = {
    onJoin: PropTypes.func.isRequired
}

export default Join