import React from 'react';
import FollowButton from '../FollowButton/FollowButton';

const SingleReview = (props) => {
  return (
    <div className="reviews-module">
    <div className="reviews-profile-thumb">
      <FollowButton id={props.user_id} />
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
