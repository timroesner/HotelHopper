import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bar from './Pages/Globals/header';
class App extends Component {
  render() {
    return (
      <div>
      <Bar />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hotel Hopper's Landing Page
          </p>
          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </div>
    );
  }
}

export default App;
