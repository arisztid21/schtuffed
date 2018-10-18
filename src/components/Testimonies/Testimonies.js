import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setTestimonies} from '../../redux/restaurantReducer'
import axios from 'axios'
import SingleTestimony from '../SingleTestimony/SingleTestimony';

class Testimonies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      rating: null,
      description: null
    }
  }

  componentDidMount() {
    axios.get('/testimonies').then(res => {
      this.props.setTestimonies(res.data)
    })
  }
handleChange = (e) => {
  console.log(e.target.value);
  this.setState({[e.target.name]: e.target.value})
}
handlePost = (title, rating, description, user_id) => {
  axios.post(`/testimonies`, {title, rating, description, user_id})
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

handleDelete = (id) => {
  axios.delete(`/testimonies/${id}`)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
}

  render () {
    //POST
      //Title
      //Description
      //Rating
      //Date Posted (08/18)
      //User - Profile Thumbnail Component
    console.log(this.state, this.props)
    let mappedTestimonies;
    if(this.props.testimonies) {
    mappedTestimonies = this.props.testimonies.map(testimony => {
      return <SingleTestimony {...testimony}
        deleteTestimony={this.handleDelete} />
    }) }
    return (
      <div className="testimonies-container">
        Testimonies
        <form onSubmit={(e) => e.preventDefault()}>
          <input name="title" type="text" placeholder={'Title...'} onChange={(e) => this.handleChange(e)} />
          <input name="rating" type="text" placeholder={'Rating...'} onChange={(e) => this.handleChange(e)} />
          <input name="description" type="text" placeholder='Description' onChange={(e) => this.handleChange(e)} />
          <button onClick={() => this.handlePost(this.state.title, this.state.rating, this.state.description, this.props.user.id)}>Submit Testimonial</button>
        </form>
        {this.props.testimonies ? mappedTestimonies : 'Loading...'}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    testimonies: state.restaurants.testimonies,
    user: state.users.user
  }
}

const mapDispatchToProps = {
  setTestimonies
}

export default connect(mapStateToProps, mapDispatchToProps) (Testimonies);
