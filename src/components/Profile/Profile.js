import React, {Component} from 'react'
import ProfileReview from './ProfileReview';
import axios from 'axios'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      userProfile: null,
      userReviews: null
    }
  }

  componentDidMount() {
    this.getProfile()
    this.getReviews()
  }

  getReviews = (id) => {
    axios.get(`/users/profiles/reviews/${this.props.match.params.id}`).then (res => {
      console.log(res.data)
      this.setState({
        userReviews: res.data
      })
    })
  }

  getProfile = (id) => {
    axios.get(`/users/profiles/${this.props.match.params.id}`).then (res => {
      console.log(res.data)
      this.setState({
        userProfile: res.data
      })
    })
  }


  render () {

    if (this.state.userReviews) {
      var displayedReviews = this.state.userReviews.map(review => {
        console.log(review)
        return <ProfileReview key={review.user_id} {...review} />
      })
    }


    return (
      <div className="profile-container">
        <div className="profiledetails-container">
          {this.state.userProfile ? this.state.userProfile[0].username : "Loading..."}
          <img src={this.state.userProfile ? this.state.userProfile[0].photos : "Loading..."} />


        </div>
        <div className="review-container">
          {this.state.userProfile ? displayedReviews : "Loading..."}
        </div>
      </div>
    )
  }
}

export default Profile
