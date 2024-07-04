import React from 'react'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {

    const {feedback} = useContext(FeedbackContext)

    return (
    <div className='feedback-list'>
        {feedback.map((item) => (
            <FeedbackItem key={item.id} item={item}/>
        ))}
    </div>
    )
}



export default FeedbackList