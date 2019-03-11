import React, { Component } from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import Bar from '../Globals/header';
class Confirmation extends Component {
  render() {
    console.log(this.props.match.params.params);
    if(this.props.match.params.params === undefined){
      return (
      <div>
        <Bar />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hotel Hopper's Temporary Post-Checkout Confirmation Page
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
    var param =this.props.match.params.params;
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

export default Confirmation;
