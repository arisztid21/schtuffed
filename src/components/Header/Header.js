import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = (props) => {
    const login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        const scope = encodeURIComponent('openid profile email');
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
      }
    return ( 
        <header>
            <div className="brand">
            </div>
            <nav>
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
    return {
        user: state.users.user
    }
}
 
export default connect(mapStateToProps, {})(Header);