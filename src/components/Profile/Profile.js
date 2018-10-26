import React, {Component} from 'react'
import ProfileReview from './ProfileReview';
import { connect } from 'react-redux';
import { setFavorites } from '../../redux/userReducer';
import axios from 'axios'
import { Link } from 'react-router-dom';
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
      console.log(res.data);
      
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
            <img src={follower.photos} alt={follower.name} />
            <h2>{follower.username}</h2>
        </div>
      })
    }
    if(this.props.favoriteRestaurants) {
      var displayedFavorites = this.props.favoriteRestaurants.map(favorite => {
        let { restaurant } = favorite;
        return <div key={restaurant.id} className="profile-favorites-container">
          <h2><Link to={`/restaurant-profile/${restaurant.id}`}>{restaurant.name}</Link></h2>
          <img src={restaurant.thumb} alt={restaurant.name} />
      </div>
      })
    }

      let { toggleFavorites, toggleFollowers, toggleReviews } = this.state
    return (
      <div className="profile">
      <div className="profile-links"></div>
        <div className="profile-details-container">
            {
              this.state.userProfile ? <div className="profile-details">
                <img src={this.state.userProfile[0].photos} />
              <div className="profile-info">
                <h1>{this.state.userProfile[0].username}</h1>
                  <div>
                  <svg id="24x24_friends" height="100%" viewBox="0 0 24 24" width="100%"><g><path d="M10.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946C1.618 12.48 2.586 11 4.018 11h4.964c1.432 0 2.4 1.48 1.842 2.817zM6.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path><path d="M21.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946c-.558-1.337.41-2.817 1.842-2.817h4.964c1.432 0 2.4 1.48 1.842 2.817zM17.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" opacity=".502"></path></g></svg>
                    <p>Following {this.state.userFollowers && this.state.userFollowers.length} </p>
                  <svg id="24x24_review" height="100%" viewBox="0 0 24 24" width="100%"><path d="M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6zm-5.88 10.428l-3.16-1.938-3.05 2.01.59-3.457L7 10.596l3.457-.505L11.96 6.5l1.582 3.59 3.458.506-2.5 2.447.62 3.385z"></path></svg> <p>{this.state.userReviews && this.state.userReviews.length} reviews</p>
                  <p>Favorite Restaurants: {this.props.favoriteRestaurants && this.props.favoriteRestaurants.length} favorites</p>
                  </div>
               </div>
              </div>
          : 'Loading...'
          }
          </div>
        <div className="review-container">
        <ul>
          <h1>{this.state.userProfile && this.state.userProfile[0].username}'s Profile</h1>
          <li onClick={() => this.toggleReviews()}>
          <svg id="24x24_review" height="100%" viewBox="0 0 24 24" width="100%"><path d="M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6zm-5.88 10.428l-3.16-1.938-3.05 2.01.59-3.457L7 10.596l3.457-.505L11.96 6.5l1.582 3.59 3.458.506-2.5 2.447.62 3.385z"></path></svg> Reviews
            </li>
            <li onClick={() => this.toggleFollowers()}>
            <svg id="24x24_friends" height="100%" viewBox="0 0 24 24" width="100%"><g><path d="M10.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946C1.618 12.48 2.586 11 4.018 11h4.964c1.432 0 2.4 1.48 1.842 2.817zM6.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path><path d="M21.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946c-.558-1.337.41-2.817 1.842-2.817h4.964c1.432 0 2.4 1.48 1.842 2.817zM17.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" opacity=".502"></path></g></svg> Following
            </li>
            <li onClick={() => this.toggleFavorites()}>
              Favorites
            </li>
          </ul>

          {toggleReviews ? <div className="reviews"> <h1>Reviews</h1> {displayedReviews} </div> : toggleFavorites ?<div className="favorites"> <h1>Favorite Restaurants</h1><br /> {displayedFavorites}</div> : toggleFollowers ? <div className="reviews"><h1>Following</h1> {displayedFollowers} </div> : 'Loading...' }
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
