import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

// This part is for localstorage
const getFeedbackFromLocalStorage = () => {
    const data = localStorage.getItem('feedback')
    return data ? JSON.parse(data) : []
}

export const FeedbackProvider = ({children}) => {
    // This part is for localstorage
    const[feedback, setFeedback] = useState(getFeedbackFromLocalStorage())
    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback))
    }, [feedback])

    const [feedbackEditBool, setfeedbackEditBool] = useState({
        item: {},
        edit: false,
    })

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }

    }

    const updateFeedback = (id, updatedItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item))
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const editFeedback = (item) => {
        setfeedbackEditBool({
            item,
            edit: true
        })
    }
    
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEditBool,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }} >
        {children}
    </FeedbackContext.Provider>
}
export default FeedbackContext