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
      rating: '',
    }
  }

  componentDidMount() {
    console.log(this.props)
    axios.get(`/restaurants/reviews/${this.props.match.params.id}`).then(res => {
      this.props.setRestaurantReviews(res.data)
    }).catch(error => console.log(error))
  }

  handleDescription (e) {
    this.setState({
      description: e.target.value
    })
  }


  render () {

    const {restaurantReviews} = this.props;
    console.log(restaurantReviews)

    let displayedReviews = restaurantReviews.map( (review, id) => {
      return <SingleReview key={id} {...review} />
    })

    return (
      <div className="restaurantreviews-container">
        <div className="postreview-container">
          <input />
          <button>Submit Review</button>
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
