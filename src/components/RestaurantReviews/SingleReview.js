import React from 'react';
import FollowButton from '../FollowButton/FollowButton';
import ProfileThumb from '../ProfileThumb/ProfileThumb'

const SingleReview = (props) => {
  console.log(props)
  return (
    <div className="reviews-module">
    <div className="reviews-profile-thumb">
    {props.user &&  <FollowButton id={props.user_id} followers={props.followers}/> }
    </div>
    <div className="profilethumb-singlereview">
    <ProfileThumb id={props.user_id}
      match={props.match}/>

    </div>
    <div className="reviews-description">
      <h3>{props.ratings}</h3>
      <h2>{props.description}</h2>
      <img src={props.review_photos}/>
    </div>
    </div>
  )
}

export default SingleReview
