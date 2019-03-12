import React, { Component } from 'react';
import logo from '../../assets/logo.svg';

class SignUp extends Component {
  render() {
    return (
      <div> 
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hotel Hopper's Temporary Sign Up Page
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

export default SignUp;
