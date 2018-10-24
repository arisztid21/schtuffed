import React, { Component } from 'react';
import routes from './routes';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchBar from './components/Header/SearchBarHeader';

class App extends Component {
  render() {
    console.log(this.props);
    
    return (
      <div className="App">
      {this.props.location.pathname !== '/' ? <SearchBar /> : <Header /> }
      
        {routes}
        {this.props.location.pathname == '/' && <Link className="conditional-testimony-link" to={'/user/testimonies'}><h3>What are people saying about Schtuffed?</h3></Link> }
      </div>
    );
  }
}

export default withRouter(App);
