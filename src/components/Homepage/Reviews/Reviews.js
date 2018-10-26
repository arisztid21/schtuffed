import React from 'react'
import './Reviews.scss';
import {Link} from 'react-router-dom'

const Reviews = (props) => {
  return (
    <div className="Reviews">
      <div className="ReviewsHeader">
        <h1>What are people saying about Schtuffed?</h1>
      </div>

      <div className="ReviewsVideo">
        Placeholder
      </div>

      <div className="ReviewsButton">
        <Link to='/user/testimonies'><button>Read User Testimonies</button></Link>
      </div>
    </div>
  )
}

export default Reviews
