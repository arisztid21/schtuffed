import React, {Component} from 'react'
import ProfileReview from './ProfileReview';
import axios from 'axios'

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
    })
  }

  render () {

    if (this.state.userProfile) {
      var displayedReviews = this.state.userProfile.map(review => {
        console.log(review)
        return <ProfileReview key={review.user_id} {...review} />
      })
    }


    return (
      <div className="profile-container">
        {this.state.userProfile ? displayedReviews : "Loading..."}
      </div>
    )
  }
}

export default Profile
