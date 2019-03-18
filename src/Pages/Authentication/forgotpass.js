import React, { Component } from 'react';
import logo from '../../assets/logo.svg';

class Forgot extends Component {
  render() {
    return (
      <div>
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hotel Hopper's Temporary Forgot Password Page
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
      </div>
      </div>
    );
  }
}

export default Forgot;
