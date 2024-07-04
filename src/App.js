import React  from "react"
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Route, Routes, json } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackData from "./data/FeedbackData"
import FeedbackForm from "./components/FeedbackForm"
import AboutPage from "./pages/AboutPage"
import AboutIconLink from "./components/AboutIconLink"

const getFeedbackFromLocalStorage = () => {
    const data = localStorage.getItem('feedback')
    return data ? JSON.parse(data) : []
}


function App() {
    const[feedback, setFeedback] = useState(getFeedbackFromLocalStorage())

    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback))
    }, [feedback])

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }

    }

    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <FeedbackForm handleAdd={addFeedback} />
                            <FeedbackStats feedback = {feedback} />
                            <FeedbackList feedback = {feedback} handleDelete={ deleteFeedback } />
                        </>
                    }>
                        
                    </Route>
                    <Route path="/about" element={<AboutPage />}/>
                </Routes>

                <AboutIconLink />
            </div>
        </Router>   
    )
}

export default App