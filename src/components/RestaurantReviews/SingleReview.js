import React from 'react';

const SingleReview = (props) => {
  return (
    <div className="reviews-module">
      <h2>{props.description}</h2>
      <h3>{props.ratings}</h3>
    </div>
  )
}

export default SingleReview
