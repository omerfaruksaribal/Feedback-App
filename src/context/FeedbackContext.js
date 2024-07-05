import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const[isLoading, setIsLoading] = useState(true)
    const[feedback, setFeedback] = useState([])
    // setFeedbackEditBool is a function to check is edit true or false and changes the feedbackEditBool true or false.
    const [feedbackEditBool, setfeedbackEditBool] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5001/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        const parsedData = data.map(item => ({
            ...item,
            rating: parseInt(item.rating, 10)
        }))
        setFeedback(parsedData)
        setIsLoading(false)
    }

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }

    }

    const updateFeedback = (id, updatedItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item))
    }

    // uuidv4() generates random ids
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        newFeedback.rating = parseInt(newFeedback.rating, 10)
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
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }} >
        {children}
    </FeedbackContext.Provider>
}
export default FeedbackContext