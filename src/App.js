import React, { Component } from 'react';
import routes from './routes';
import './Reset.css';
import Header from './components/Header/Header';
import CreateReview from './components/CreateReview/CreateReview';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header />
        {routes}
        <CreateReview/>
      </div>
    );
  }
}

export default App;
