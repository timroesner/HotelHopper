import React, { Component } from 'react';
import logo from '../../assets/logo.svg';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(type) {
    if(type === "Rewards") {

    } else {

    }
  }

  rewardsDiv = () => {
    return [
      <div className="mt-8 pb-8 border-b">
         <p className="text-dark-blue text-sans font-bold text-2xl">You are eligible for a free stay</p>
         <div className="mt-8 flex items-flex">
          <p className="w-full text-sans font-bold text-xl">Your Balance:</p>
          <p className="w-full text-sans font-bold text-xl text-right">DCB</p>
         </div>
         <div className="mt-2 flex items-flex">
          <p className="w-full text-sans font-bold text-xl">Points needed for free stay:</p>
          <p className="w-full text-sans font-bold text-xl text-right">DCB</p>
         </div>
         <button className="mt-8 bg-soft-blue rounded text-white py-3 px-4 font-sans text-xl font-bold" onClick={() => this.handleSubmit("Rewards")}>Redeem</button>
      </div>
    ]
  }
  
  render() {
    return (
        <div className="m-8 md:flex md:items-flex">
          <div className="md:w-2/3 mb-2 md:mr-4">
            <div className="pb-8 border-b">
              <p className="text-sans font-bold text-2xl">Basic Information</p>
              <div className="mt-4 flex items-flex">
                <input className="shadow appearance-none bg-white font-bold mr-4 border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="firstName" value={this.state.firstName} onChange={this.handleChange} type="text" placeholder="First Name" />
                <input className="shadow appearance-none bg-white font-bold mr-4 border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="lastName" value={this.state.lastName} onChange={this.handleChange} type="text" placeholder="Last Name" />
              </div>
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-3/5 rounded h-14 mt-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="email" value={this.state.email} onChange={this.handleChange} type="text" placeholder="E-mail" />
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-3/5 rounded h-14 mt-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} type="text" placeholder="Phone Number" />
            </div>
            {this.rewardsDiv()}
          </div>
          <div className="md:w-1/3 h-8 bg-green">
          </div>
      </div>
    );
  }
}

export default Checkout;
