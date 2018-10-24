import React, { Component } from 'react';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchBar from './components/Header/SearchBarHeader';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {
    console.log(this.props);

    return (
      <div className="App">
      {this.props.location.pathname !== '/' ? <SearchBar /> : <Header /> }

        {routes}

      <Footer />

      </div>
    );
  }
}

export default withRouter(App);
