import React, { Component } from 'react';
import logo from '../../assets/logo.svg';

class Error extends React.Component {
	constructor(props){
  		super(props);
  		
 }
		
	render() {
    	return (
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Hotel Hopper's Temporary Error Page
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
		)	
	}
}

export default Error;