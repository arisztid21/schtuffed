import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setRestaurantReviews} from '../../redux/restaurantReducer'
import { setFollowers } from '../../redux/userReducer';
import SingleReview from './SingleReview'
import CreateReview from '../CreateReview/CreateReview';

class RestaurantReviews extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      ratings: '',
      review_photos: ''
    }
  }

  componentDidMount() {
    axios.get(`/restaurants/profile/reviews/${this.props.match.params.id}`).then(res => {
      console.log(res);
      this.props.setRestaurantReviews(res.data)
    }).catch(error => console.log(error))
    this.props.setFollowers(this.props.user.id)
  }

  postReview = (ratings, description, restaurant_id, user_id, review_photos) => {
    console.log(ratings, description, restaurant_id, user_id, review_photos)
    const reviewInput = {
      ratings,
      description,
      user_id,
      review_photos
    }
    console.log(restaurant_id)
    axios.post(`/restaurants/reviews/${restaurant_id}`, {reviewInput}).then( res => {
      this.props.setRestaurantReviews(res.data)
      .then(axios.get(`/restaurants/profile/reviews/${this.props.match.params.id}`).then(res => {
        this.props.setRestaurantReviews(res.data)
      }
      ))
    }).catch(error => console.log(error))
  }

  handleRatings = (e) => {
    this.setState({
      ratings: e.target.value
    })
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handlePhoto = (val) => {
    this.setState({
      review_photos: val
    })
  }

  render () {
    console.log(this.props)

    const {restaurantReviews, user, followers} = this.props;
    const {description, ratings, review_photos} = this.state
    let displayedReviews;
    if(restaurantReviews){
      displayedReviews = restaurantReviews.map( (review, i) => {
      return <SingleReview key={i} match={this.props.match} user={user} followers={followers} {...review}/>
    })
  }

    return (
      <div className="restaurantreviews-container">
      {user && 
        <div className="postreview-container">
          <h2>Rating:</h2><input onChange={(e) => this.handleRatings(e)}/>
          <h2>Description:</h2><input onChange={(e) => this.handleDescription(e)}/>
          <CreateReview reviewPhoto={this.state.review_photos}
                        handlePhoto={this.handlePhoto}/>
          <button onClick={() => this.postReview(ratings, description, this.props.match.params.id, user.id, review_photos)}>Submit Review</button>
      </div>
      }


        <div className="displayed-reviews">
          {displayedReviews ? displayedReviews : 'Loading...'}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.restaurants.restaurantReviews)
  console.log(state)
  let { user, followers } = state.users
  return {
    restaurantReviews: state.restaurants.restaurantReviews,
    user,
    followers
  }
}

const mapDispatchToProps = {
  setRestaurantReviews,
  setFollowers
}

export default connect(mapStateToProps, mapDispatchToProps) (RestaurantReviews);
