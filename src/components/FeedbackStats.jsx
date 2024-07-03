import React from 'react'
import PropTypes from 'prop-types'

function FeedbackStats({ feedback }) {
    let total = 0
    for (let index = 0; index < feedback.length; index++) {
        total += feedback[index].rating
    }
    let average = (total/feedback.length).toFixed(1).replace(/[.,]0$/, '')
  return (
    <div className='feedback-stats'>
        <h4>
            {feedback.length} Reviews
        </h4>   
        <h4>
            Average Rating {isNaN(average) ? 0 : average}
        </h4>
    </div>
  )
}

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired,
}

export default FeedbackStats