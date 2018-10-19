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
    this.getFollowers();
  }

  getReviews = () => {
    axios.get(`/users/profiles/reviews/${this.props.match.params.id}`).then (res => {
      this.setState({
        userReviews: res.data
      })
    })
  }

  getProfile = () => {
    axios.get(`/users/profiles/${this.props.match.params.id}`).then (res => {
      this.setState({
        userProfile: res.data
      })
    })
  }
  getFollowers = () => {
    axios.get(`/users/followers/${this.props.match.params.id}`)
      .then(res => console.log('FOLLOWERS', res))
      .catch(err => console.log('Err in getFollowers', err));
  }


  render () {

    if (this.state.userReviews) {
      var displayedReviews = this.state.userReviews.map(review => {
        return <ProfileReview key={review.user_id} {...review} />
      })
    }


    return (
      <div className="profile-container">
        <div className="profiledetails-container">
          {this.state.userProfile ? this.state.userProfile[0].username : "Loading..."}
          <img src={this.state.userProfile ? this.state.userProfile[0].photos : "Loading..."} />
          <ul>
            <li>
              Followers
            </li>
          </ul>
        </div>
        <div className="review-container">
          {this.state.userProfile ? displayedReviews : "Loading..."}
        </div>
      </div>
    )
  }
}

export default Profile
