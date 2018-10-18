import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link to="/Shop">Shop</Link>
            </nav>
            <div className="login-signup">
                <button onClick={login}>Log In</button>
                <button>Sign Up</button>
            </div>
        </header>
     );
}
 
export default Header;