import React from 'react'
import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project</h1>
            <p>This is a React app to leave feedback for a product or service</p>
            <p>Version: 1.4.2</p>
            <p>
                <Link to='https://www.linkedin.com/in/ömerfaruk-sarıbal-49a233256/' >by Ömerfaruk Sarıbal</Link>
            </p>

            <p>
                <Link to="/">Back To Home</Link>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage