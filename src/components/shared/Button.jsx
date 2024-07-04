import React from 'react'
import PropTypes from 'prop-types'

function Button({ children, version, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`} >
        {children}
    </button>
)
}

// defaultProps provides, default input, if inputs are empty then defaulProps fills the empty parts 
Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false
}

// propTypes provides the requirement for inputs
Button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    text: PropTypes.string,
    isDisabled: PropTypes.bool
}

export default Button