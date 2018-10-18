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
