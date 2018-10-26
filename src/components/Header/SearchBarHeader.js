import React from 'react';
import { Link } from 'react-router-dom';
import { setRestaurantList, setCityId, setSearchInput } from '../../redux/restaurantReducer';
import { setUser } from '../../redux/userReducer';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './SearchBarHeader.scss'

const SearchBar = (props) => {
  console.log(props);
  
    let { setRestaurantList, setCityId, setSearchInput, searchInput, cityId } = props
    const login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        const scope = encodeURIComponent('openid profile email');
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
      }
      const handleSearch = () => {
        props.setRestaurantList(props.searchInput, props.cityId, props.history)
    }
    const logout = () => {
      axios.post('/api/logout').then(() => props.history.push('/'));
  }
    return (
      <div className="SearchBarHeader">
        <div className="SearchBarHeaderSecondary">
          <div className="SearchBarHeaderLogo">
            <Link to='/'><h1>Schtuffed</h1></Link>
          </div>

          <div className="SearchBarHeaderInput">
            <form onSubmit={(e) => e.preventDefault()}>
              <span>Find</span>
              <input id="margin" onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Restaurants" />

              <span>Near</span>
              <input onChange={(e) => setCityId(e.target.value)} type="text" placeholder={props.restaurantList[0].restaurant.location.city} />
            </form>
              <button onClick={() => handleSearch()}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Antu_dialog-icon-preview.svg/512px-Antu_dialog-icon-preview.svg.png" /></button>
          </div>

          <div className="SearchBarHeaderLogin">
            {props.user ? <button onClick={logout}>Logout</button> : <React.Fragment> <button id="login" onClick={login}>Log In</button>
                <button className="signup" onClick={login}>Sign Up</button> </React.Fragment> }
          </div>
        </div>
      </div>
      // {props.user ? <button onClick={logout}>Logout</button> : <React.Fragment> <button id="login" onClick={login}>Log In</button>
      // <button className="signup" onClick={login}>Sign Up</button> </React.Fragment> }
    );
}

const mapStateToProps = state => {
    let { restaurantList, searchInput, cityId } = state.restaurants;
    let { user } = state.users;
    return {
        restaurantList,
        searchInput,
        cityId,
        user
    }
}
const mapDispatchToProps = {
   setRestaurantList,
   setCityId,
   setSearchInput, setUser
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
