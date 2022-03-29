import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    div: {
        width: '650px' //костыль
    }
}

function Create({onConnect, name}) {

    function submitCode(event) {
        event.preventDefault()
        onConnect(String(Math.floor(Math.random() * 100000)))
    }

    return (
        <div className='block' style={styles.div}>
            <form onSubmit={submitCode}>
                <p>To create a game click create</p>
                <button className='button' type='submit'>create</button>
            </form>
        </div>)

}

Create.propTypes = {
    onConnect: PropTypes.func.isRequired
}

export default Create