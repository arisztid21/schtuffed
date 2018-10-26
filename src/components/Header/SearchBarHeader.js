import React from 'react';
import { Link } from 'react-router-dom';
import { setRestaurantList, setCityId, setSearchInput } from '../../redux/restaurantReducer';
import { setUser } from '../../redux/userReducer';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import './SearchBarHeader.scss'

const SearchBar = (props) => {
    let { setRestaurantList, setCityId, setSearchInput, searchInput, cityId } = props
    const login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        const scope = encodeURIComponent('openid profile email');
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
      }
      const handleSearch = () => {
        props.setRestaurantList(props.searchInput, props.cityId, props.history)
    }
    return (
      <div className="SearchBarHeader">
        <div className="SearchBarHeaderSecondary">
          <div className="SearchBarHeaderLogo">
            <Link to='/'><h1>Schtuffed</h1></Link>
          </div>

          <div className="SearchBarHeaderInput">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="SearchBarHeaderForm">
                <span>Find</span>
                <input id="margin" onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Restaurants" />
              </div>

              <div className="SearchBarHeaderForm">
                <span>Near</span>
                <input onChange={(e) => setCityId(e.target.value)} type="text" placeholder={props.restaurantList[0].restaurant.location.city} />
              </div>
            </form>
              <button onClick={() => handleSearch()}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Antu_dialog-icon-preview.svg/512px-Antu_dialog-icon-preview.svg.png" /></button>
          </div>

          <div className="SearchBarHeaderLogin">
            <button id="login" onClick={login}>Log In</button>
            <button id="signup" onClick={login}>Sign Up</button>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = state => {
    let { restaurantList, searchInput, cityId } = state.restaurants;
    return {
        restaurantList,
        searchInput,
        cityId
    }
}
const mapDispatchToProps = {
   setRestaurantList,
   setCityId,
   setSearchInput, setUser
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
