import React from 'react';
import { Link } from 'react-router-dom';
import { setRestaurantList, setCityId, setSearchInput } from '../../redux/restaurantReducer';
import { setUser } from '../../redux/userReducer';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

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
        <header>
            <div className="brand">
            </div>
            <nav>
            <form onSubmit={(e) => e.preventDefault()}>
                    <input id="query" onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="italian, burgers, vegetarian..." />
                    <input onChange={(e) => setCityId(e.target.value)} type="text" placeholder="city name..." />
                    <button onClick={() => handleSearch()}><span role="img">&#x1F50E;</span></button>
                </form>
                <Link to="/">Home</Link>
                <Link to="/search/results">Results(Test)</Link>
                {props.user && <Link to={`/user/profile/${props.user.id}`}>Profile(Test)</Link>}
                <Link to="/shop">Shop</Link>
                <Link to="/cart">Cart</Link>
            </nav>
            <div className="login-signup">
                <button onClick={login}>Log In</button>
                <button>Sign Up</button>
            </div>
        </header>
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