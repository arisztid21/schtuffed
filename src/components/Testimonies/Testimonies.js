import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setTestimonies} from '../../redux/restaurantReducer'
import axios from 'axios'

class Testimonies extends Component {

  componentDidMount() {
    axios.get('/testimonies').then(res => {
      this.props.setTestimonies(res.data)
    })
  }

  render () {
    console.log(this.props)

    return (
      <div className="testimonies-container">
        Testimonies
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    testimonies: state.restaurants.testimonies
  }
}

const mapDispatchToProps = {
  setTestimonies
}

export default connect(mapStateToProps, mapDispatchToProps) (Testimonies);
