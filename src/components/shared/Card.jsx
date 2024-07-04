import React from 'react'
import PropTypes from 'prop-types'

// Card is like a board, it contains feedback input and feedback list. The usage of card is : <Card> </Card>

function Card({children, reverse}) {
  return (
    <div className="card" style={
        {
            backgroundColor: reverse ? 'rgba(0,0,0,0.8)' : '#fff',
            color: reverse ? '#fff' : 'rgba(0,0,0,0.8)',
        }}
        >
            {children}
    </div>
  )
}

// defaultProps provides, default input, if inputs are empty then defaulProps fills the empty parts 
Card.defaultProps = {
    reverse: false,
}

// propTypes provides the requirement for inputs
Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
}

export default Card