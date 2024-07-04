import React from 'react'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackStats() {    
    const {feedback} = useContext(FeedbackContext)

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

export default FeedbackStats