import React, { Component } from 'react';
import routes from './routes';
<<<<<<< HEAD
import './Reset.css';
=======
>>>>>>> 97ba45d5eb2d483473476169b6646665091a49b4
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
