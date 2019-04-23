import React, { Component } from 'react';
import api from '../../helper/endpoints';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      reservation: {
        startDate: "2019-08-05",
        endDate: "2019-08-08",
        hotelId: "23",
        rooms: {
          "Single": 1,
          "Double": 1
        }
      },
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadUserData()
    this.parseParams()
    this.loadHotelInfo()
  }

  loadUserData = () => {
    const token = window.localStorage.getItem("token")
    if(token !== null) {
      fetch(api + "/auth/userDetails", {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': "Bearer "+token
        }
      }).then(results => {
          return results.json();
      }).then(data => {
        this.setState({user: data['data']})
      })
    } else {
      this.props.history.push(`/login`);
    }
  }

  parseParams = () => {
    
  }

  loadHotelInfo = () => {
    const reservation = this.state.reservation
    fetch(api + `/hotels/${reservation.hotelId}?startDate=${reservation.startDate}&endDate=${reservation.endDate}`, {
      method: "GET",
      headers: {
        'accept': 'application/json'
      }
    }).then(results => {
        return results.json();
    }).then(data => {
      console.log(data)
      this.setState({hotel: data['data']})
    })
  }

  handleChange(event) {
    this.setState({
      user: {[event.target.id]: event.target.value}
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
                id="firstName" value={this.state.user.firstName} onChange={this.handleChange} type="text" placeholder="First Name" />
                <input className="shadow appearance-none bg-white font-bold mr-4 border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="lastName" value={this.state.user.lastName} onChange={this.handleChange} type="text" placeholder="Last Name" />
              </div>
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-3/5 rounded h-14 mt-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="email" value={this.state.user.email} onChange={this.handleChange} type="text" placeholder="E-mail" />
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-3/5 rounded h-14 mt-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber" value={this.state.user.phoneNumber} onChange={this.handleChange} type="text" placeholder="Phone Number" />
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
