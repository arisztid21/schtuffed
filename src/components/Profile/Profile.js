import React, {Component} from 'react'
import ProfileReview from './ProfileReview';
import { connect } from 'react-redux';
import { setFavorites } from '../../redux/userReducer';
import axios from 'axios'
import './profile.scss';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      userProfile: null,
      userReviews: null,
      userFollowers: null,
      toggleFollowers: false,
      toggleFavorites: false,
      toggleReviews: true
    }
  }

  componentDidMount() {
    this.getProfile()
    this.getReviews()
    this.getFollowers();
    this.props.setFavorites(this.props.match.params.id);
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
      .then(res => {
        console.log('FOLLOWERS', res)
        this.setState({
          userFollowers: res.data
        })
      })
      .catch(err => console.log('Err in getFollowers', err));
  }
  toggleFavorites = () => {
    this.setState({
      toggleFavorites: true,
      toggleFollowers: false,
      toggleReviews: false
    })
  }
  toggleFollowers = () => {
    this.setState({
      toggleFavorites: false,
      toggleFollowers: true,
      toggleReviews: false
    })
  }
  toggleReviews = () => {
    this.setState({
      toggleFavorites: false,
      toggleFollowers: false,
      toggleReviews: true
    })
  }


  render () {
console.log(this.state);

    if (this.state.userReviews) {
      var displayedReviews = this.state.userReviews.map((review, i )=> {
        return <ProfileReview key={i} {...review} />
      })
    }
    if(this.state.userFollowers) {
      var displayedFollowers = this.state.userFollowers.map(follower => {
        return <div key={follower.id} className="profile-followers-container">
            <h2>{follower.username}</h2>
            <img src={follower.photos} alt={follower.name} />
        </div>
      })
    }
    if(this.props.favoriteRestaurants) {
      var displayedFavorites = this.props.favoriteRestaurants.map(favorite => {
        let { restaurant } = favorite;
        return <div key={restaurant.id} className="profile-favorites-container">
        <h2>{restaurant.name}</h2>
        <img src={restaurant.thumb} alt={restaurant.name} />
    </div>
      })
    }

      let { toggleFavorites, toggleFollowers, toggleReviews } = this.state
    return (
      <div className="profile">
        <div className="profiledetails-container">
          <img src={this.state.userProfile ? this.state.userProfile[0].photos : "Loading..."} />
          {this.state.userProfile ? this.state.userProfile[0].username : "Loading..."}
        </div>
        <div className="review-container">
        <ul>
          <li onClick={() => this.toggleReviews()}>
              Reviews
            </li>
            <li onClick={() => this.toggleFollowers()}>
              Following
            </li>
            <li onClick={() => this.toggleFavorites()}>
              Favorites
            </li>
          </ul>

          {toggleReviews ? displayedReviews : toggleFavorites ? displayedFavorites : toggleFollowers ? displayedFollowers : 'Loading...' }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let { favoriteRestaurants } = state.users;
  return {
    favoriteRestaurants
  }
}

export default connect(mapStateToProps, {setFavorites})(Profile);
