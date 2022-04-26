import React, {useState} from 'react'
import PropTypes from 'prop-types'

function Name({setName}) {

    return (
        <input type='text' placeholder="USERNAME" onChange={event => setName(event.target.value)}/>
    )
}

Name.propTypes = {
    setName: PropTypes.func.isRequired
}

export default Name;