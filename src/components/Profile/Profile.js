<<<<<<< HEAD
import React, {Component} from 'react'
import SingleReview from './RestaurantReviews/SingleReview'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      userProfile: null
    }
  }

  componentDidMount() {
    axios.get(`/users/profiles/reviews/${this.props.match.params.id}`).then( res => {
      console.log(res)
      this.setState({
        userProfile: res.data
      })
    )
  }
}

  render () {
    const displayedReviews = this.state.userProfile.map(review => {
      console.log(review)
      return <SingleReview key={review.id} {...review} />
    })

    return (
      <div className="profile-container">
        {displayedReviews}
      </div>
    )
  }
}

export default Profile
=======
import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userProfile: null
         }
    }
    render() { 
        return ( 
            <div>
                Profile
            </div>
         );
    }
}
 
export default Profile;
>>>>>>> bc206ac9bad394e130931ab892b7a0a07cae3a3d
