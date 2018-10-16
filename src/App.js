import React, { Component } from 'react';
import routes from './routes';
import './Reset.css';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header />
        {routes}
      </div>
    );
  }
}

export default App;
