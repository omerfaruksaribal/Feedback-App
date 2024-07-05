import { createContext, useState, useEffect } from 'react'

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
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        const parsedData = data.map(item => ({
            ...item,
            rating: parseInt(item.rating, 10)
        }))
        setFeedback(parsedData)
        setIsLoading(false)
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' })

            setFeedback(feedback.filter((item) => item.id !== id))
        }

    }

    const updateFeedback = async (id, updatedItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item))
    }

    // uuidv4() generates random ids
    const addFeedback = async (newFeedback) => {
        newFeedback.rating = parseInt(newFeedback.rating, 10)
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
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