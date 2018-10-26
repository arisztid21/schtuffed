import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setTestimonies} from '../../redux/restaurantReducer'
import axios from 'axios'
import SingleTestimony from '../SingleTestimony/SingleTestimony';
import './Testimonies.scss'
import Samus from './assets/Samus.png';
import Jigglypuff from './assets/Jigglypuff.png';
import Link from './assets/Link.png';

class Testimonies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      rating: null,
      description: null,
      toggleEdit: false,
      editedTestimony: null,
      toggleForm: false
    }
  }

  componentDidMount() {
    this.getTestimonies()
  }

  getTestimonies = () => {
    axios.get('/testimonies').then(res => {
      this.props.setTestimonies(res.data)
    })
  }

handleChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

handlePost = (title, rating, description, user_id) => {
  axios.post(`/testimonies`, {title, rating, description, user_id})
    .then(res => this.props.setTestimonies(res.data))
    .then(axios.get('/testimonies').then(res => {
      this.props.setTestimonies(res.data)
    }))
    .catch(err => console.log(err));
}

handleDelete = (id) => {
  axios.delete(`/testimonies/${id}`)
  .then(res => {
    this.props.setTestimonies(res.data)
  })
  .catch(err => console.log(err))
}

handleToggleEdit = (title, rating, description, id) => {
  this.setState({
      title,
      rating,
      description,
      toggleEdit: !this.state.toggleEdit,
      editedTestimony: id
  })
}

handleUpdate = (id, title, rating, description, user_id) => {
  console.log(id, title, rating, description, user_id);

  axios.put(`/testimonies/${id}`, {id, title, rating, description, user_id}).then( res => {
    console.log(res.data[0])
    this.setState({
      toggleEdit: !this.state.toggleEdit,
      tite: res.data[0].title,
      description: res.data[0].description,
      rating: res.data[0].ratings
    })
  }).catch(error => console.log(error))
}


  handleToggleEditTransition = () => {
    this.setState({
      toggleForm: !this.state.toggleForm
    })
  }



  render () {
    console.log(this.state, this.props)
    console.log(this.props.testimonies)

    let mappedTestimonies;
    if(this.props.testimonies) {
    mappedTestimonies = this.props.testimonies.map(testimony => {
      return <SingleTestimony
        key={testimony.id}
        {...testimony}
        user={this.props.user}
        stateTitle={this.state.title}
        stateRating={this.state.rating}
        stateDescription={this.state.description}
        toggleEdit={this.state.toggleEdit}
        editedTestimony={this.state.editedTestimony}
        deleteTestimony={this.handleDelete}
        handleToggleEdit={this.handleToggleEdit}
        handleChange={this.handleChange}
        editTestimony={this.handleUpdate}
        getTestimonies={this.getTestimonies}
        />
    }) }
    return (
      <div className="Testimonies">
        <div className="TestimoniesSecondary">
          <div className="TestimoniesHeader">
            <h1>Check out what people are saying!</h1>

            <div className="TestimoniesSmash">
              <div className="TestimoniesSingleSmash">
                <img src={Samus} /><br/>
                  <div className="TestimoniesSingleSmashText">
                      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h3>
                  </div>
                  <h2>- Samus</h2>
              </div>
              <div className="TestimoniesSingleSmash">
                <img src={Link} /><br/>
                  <div className="TestimoniesSingleSmashText">
                      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h3>
                  </div>
                  <h2>- Link</h2>
              </div>
              <div className="TestimoniesSingleSmash">
                <img src={Jigglypuff} /><br/>
                <div className="TestimoniesSingleSmashText">
                    <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h3>
                </div>
                <h2>- Jigglypuff</h2>
              </div>
            </div>

          </div>
          <div className="TestimoniesDisplayed">
            <div className="TestimoniesLength">
              {this.props.user ? <button onClick={this.handleToggleEditTransition}>Share Your Experience!</button> : null}
              <h2>Displaying: {this.props.testimonies ? this.props.testimonies.length : "Loading..."} Reviews</h2>
            </div>


            <div className="TestimoniesForm">
              <form className={this.state.toggleForm ? 'show' : 'none'} onSubmit={(e) => e.preventDefault()}>
                <div className="TestimoniesFormInput">
                  <div className="TestimoniesSingleFormInput">
                    <h2>Headline</h2>
                    <input name="title" type="text" placeholder={'Title...'} onChange={(e) => this.handleChange(e)} /><br/>
                  </div>

                  <div className="TestimoniesSingleFormInput">
                    <h2>Rating</h2>
                    <input name="rating" type="text" placeholder={'Rating...'} onChange={(e) => this.handleChange(e)} /><br/>
                  </div>


                  <div className="TestimoniesSingleFormInput">
                    <h2>Description</h2>
                    <input name="description" type="text" placeholder='Description' onChange={(e) => this.handleChange(e)} /><br/>
                  </div>
                </div>


                <div className="TestimoniesFormButton">
                  <button onClick={() => this.handlePost(this.state.title, this.state.rating, this.state.description, this.props.user.id)}>Submit Testimonial</button><br/>
                </div>
              </form>
            </div>

            <div className="TestimoniesList">
              {this.props.testimonies ? mappedTestimonies : 'Loading...'}
            </div>
          </div>
        </div>
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
