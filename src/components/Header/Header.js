import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return ( 
        <header>
            <div className="brand">
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/search/results">Results(Test)</Link>
            </nav>
        </header>
     );
}
 
export default Header;