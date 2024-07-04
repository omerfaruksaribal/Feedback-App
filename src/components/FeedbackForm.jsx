import React from 'react'
import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    // In the beggining users input is empty
    // setText is a function changes the text -> text is input.
    const [text, setText] = useState('')
    
    // setRating is a function changes the rating
    // Rating is between 1-10
    const [rating, setRating] = useState(10)
    
    // setBtnDisabled is a function which changes the btnDisabled true or false
    // If the input less than 10 characters, then button disabled. If the input more than 10 characters, then button activated. 
    const [btnDisabled, setBtnDisabled] = useState(true)
    
    // setMessage is a function to specify the message to visible or invisible
    // In the beggining there are no message to show. 
    // If the input less than 10 characters, then message become visible, if the input more than 10 characters, then the message become invicible 
    const [message, setMessage] = useState('')
    
    // addFeedback: is a function which is adds the feedbacks 
    // feedbackEditBool: is a variable, contains items and bool
    // updateFeedback: is a function which is updates the feedbacks
    const {addFeedback, feedbackEditBool, updateFeedback } = useContext(FeedbackContext)

    // If there any changes on the page, useEffect checks and shows the changes.
    useEffect(() => {
        if (feedbackEditBool.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEditBool.item.text)
            setRating(feedbackEditBool.item.rating)
        }
    }, [feedbackEditBool])

    // Checks the input is there is any message
    const handleTextChange = (e) => {

        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length < 10) {
            setMessage('Text must be at least 10 character')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value)
    }

    // Takes the feedback input
    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10 ) {
            const newFeedback = {
                text: text,
                rating: rating,
            }

            if (feedbackEditBool.edit) {
                updateFeedback(feedbackEditBool.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }

            setText('')
        }
    }

    return (
    <Card>
        <form onSubmit={handleSubmit} > 
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={ (rating) => setRating(rating) } />
            <div className="input-group">
                <input
                    onChange={handleTextChange}
                    type='text' 
                    placeholder='Write a review'
                    value={text}
                />
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className='message' >{message}</div>}
        </form>
    </Card>
  )
}


export default FeedbackForm