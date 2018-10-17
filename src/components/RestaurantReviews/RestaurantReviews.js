import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setRestaurantReviews} from '../../redux/restaurantReducer'
import SingleReview from './SingleReview'

class RestaurantReviews extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      ratings: ''
    }
  }

  componentDidMount() {
    console.log(this.props)
    axios.get(`/restaurants/reviews/${this.props.match.params.id}`).then(res => {
      this.props.setRestaurantReviews(res.data)
    }).catch(error => console.log(error))
  }

  postReview = (ratings, description, date_posted, user_id, restaurant_id) => {
    console.log('Are you firing?')
    const reviewInput = {
      ratings,
      description,
      date_posted,
      user_id,
      restaurant_id
    }
    axios.post('/restaurants/reviews', {reviewInput}).then( res => {
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

  render () {

    const {restaurantReviews} = this.props;
    const {description, ratings} = this.state

    console.log(restaurantReviews)

    let displayedReviews = restaurantReviews.map( (review, id) => {
      return <SingleReview key={id} {...review} />
    })

    return (
      <div className="restaurantreviews-container">
        <div className="postreview-container">
          <h2>Rating:</h2><input onChange={(e) => this.handleRatings(e)}/>
          <h2>Description:</h2><input onChange={(e) => this.handleDescription(e)}/>
          <button onClick={() => this.postReview(ratings, description)}>Submit Review</button>
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
  return {
    restaurantReviews: state.restaurants.restaurantReviews
  }
}

const mapDispatchToProps = {
  setRestaurantReviews
}

export default connect(mapStateToProps, mapDispatchToProps) (RestaurantReviews);
