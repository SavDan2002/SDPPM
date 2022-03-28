import React, { useState } from 'react'
import PropTypes from 'prop-types'

const styles = {
    div: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
}

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
      bind: {
        value,
        onChange: event => setValue(event.target.value)
      },
      clear: () => setValue(''),
      value: () => value
    }
  }

function Join ({ onJoin }) {
    //const value = 'Daniil'
    const input = useInputValue('')

    function submitCode(event) {
    event.preventDefault()

    if (input.value().trim()) {
        onJoin(input.value())
        input.clear()
    }
  }
    return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitCode}>
      <input {...input.bind} />
      <button type='submit'>Add todo</button>
    </form>)

}

Join.propTypes = {
    onJoin: PropTypes.func.isRequired
}

export default Join