import React from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

function Modal(props){
    return (
        <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div className='modal_content' onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired
}

export default Modal
























