import React from 'react'
import {FaQuestion} from 'react-icons/fa'
import { Link } from 'react-router-dom'


// AboutIconLink is a icon that looks like (?). When the user clicks the icon, it routes the /about page. 
function AboutIconLink() {
  return (
    <div className='about-link'>
        <Link to={{
            pathname: '/about',
            }}>
            <FaQuestion size={30}/>
        </Link>
        
    </div>
  )
}

export default AboutIconLink