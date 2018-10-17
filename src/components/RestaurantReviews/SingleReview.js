import React from 'react';
import FollowButton from '../FollowButton/FollowButton';

const SingleReview = (props) => {
  console.log(props);
  return (
    <div className="reviews-module">
    <div className="reviews-profile-thumb">
      <FollowButton id={props.id} />
    </div>
    <div className="reviews-description">
      <h3>{props.ratings}</h3>
      <h2>{props.description}</h2>
    </div>
    </div>
  )
}

export default SingleReview
