import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bar from './header';
class Hotel extends Component {
  render() {
    return (
      <div>
        <Bar />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hotel Hopper's Temporary Hotel Page
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

export default Hotel;
