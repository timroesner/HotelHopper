import React, { Component } from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import Bar from '../Globals/header';
class Hotel extends Component {
  render() {
    console.log(this.props.match.params.id);
    if (this.props.match.params.id === undefined) {
      console.log("yee");
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
  else{
    var param =this.props.match.params.id;
      return (
        <div>
          <Bar />
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Hotel Hopper's Temporary Post-Checkout Confirmation Page for {param}
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
}

export default Hotel;
