import React, { Component } from 'react';
import routes from './routes';
import Header from './components/Header/Header';
import SearchBar from './components/Header/SearchBarHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
      <SearchBar />
      <Header />
        {routes}
      </div>
    );
  }
}

export default App;
