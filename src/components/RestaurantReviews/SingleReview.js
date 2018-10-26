import React from 'react';
import FollowButton from '../FollowButton/FollowButton';
import ProfileThumb from '../ProfileThumb/ProfileThumb'
import './SingleReview.scss'

const SingleReview = (props) => {
  console.log(props)
  return (
    <div className="SingleReview">

        <div className="SingleReviewUser">
          <ProfileThumb id={props.user_id} match={props.match}/>
            {props.user &&  <FollowButton id={props.user_id} followers={props.followers}/> }
        </div>

        <div className="SingleReviewDescription">
          <h3>{props.ratings}</h3>
          <h2>{props.description}</h2><br/>
          <img src={props.review_photos}/>
        </div>
    </div>
  )
}

export default SingleReview
