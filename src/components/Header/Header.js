import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Header.scss';

const Header = (props) => {
    const login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        const scope = encodeURIComponent('openid profile email');
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
      }
      const logout = () => {
          axios.post('/api/logout').then(() => console.log('Logged out'));
      }
    return ( 
        <header className="header">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/search/results">Results(Test)</Link>
                {props.user && <Link to={`/user/profile/${props.user.id}`}>Profile(Test)</Link>}
                <Link to="/shop">Shop</Link>
                <Link to="/cart">Cart</Link>
            </nav>
            <div className="login-signup">
                {props.user ? <button onClick={logout}>Logout</button> : <React.Fragment> <button onClick={login}>Log In</button>
                <button className="signup" onClick={login}>Sign Up</button> </React.Fragment> }
            </div>
        </header>
     );
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
}
 
export default connect(mapStateToProps, {})(Header);