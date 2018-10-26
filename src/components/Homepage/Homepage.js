import React from 'react'
import Main from './Main/Main'
import Reviews from './Reviews/Reviews'

const Homepage = (props) => {

console.log(props)

  return (
    <div className="Homepage">
      <Main history={props.history}/>
      <Reviews />
    </div>
  )
}

export default Homepage;
