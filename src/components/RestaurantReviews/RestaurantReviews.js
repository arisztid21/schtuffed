import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setRestaurantReviews} from '../../redux/restaurantReducer'
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
    console.log(this.props)
    axios.get(`/restaurants/reviews/${this.props.match.params.id}`).then(res => {
      console.log(res);
      this.props.setRestaurantReviews(res.data)
    }).catch(error => console.log(error))
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
    }).catch(error => console.log(error))
  }

  handleRatings = (e) => {
    this.setState({
      ratings: e.target.value
    })
  }

  handleDescription = (e) => {
    console.log(e.target.value)
    this.setState({
      description: e.target.value
    })
  }

  handlePhoto = (val) => {
    console.log(val)
    this.setState({
      review_photos: val
    })
  }

  render () {

    const {restaurantReviews, user} = this.props;
    const {description, ratings, review_photos} = this.state

    console.log(restaurantReviews)
    console.log('state======', this.state)

    let displayedReviews = restaurantReviews.map( (review, i) => {
      console.log(review);
      
      return <SingleReview key={i} {...review} />
    })

    return (
      <div className="restaurantreviews-container">
        <div className="postreview-container">
          <h2>Rating:</h2><input onChange={(e) => this.handleRatings(e)}/>
          <h2>Description:</h2><input onChange={(e) => this.handleDescription(e)}/>
          <CreateReview reviewPhoto={this.state.review_photos}
                        handlePhoto={this.handlePhoto}/>
          <button onClick={() => this.postReview(ratings, description, this.props.match.params.id, user.id, review_photos)}>Submit Review</button>
      </div>


        <div className="displayed-reviews">
          {displayedReviews}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.restaurantReviews)
  console.log(state)
  let { user } = state.users
  return {
    restaurantReviews: state.restaurants.restaurantReviews,
    user
  }
}

const mapDispatchToProps = {
  setRestaurantReviews
}

export default connect(mapStateToProps, mapDispatchToProps) (RestaurantReviews);
