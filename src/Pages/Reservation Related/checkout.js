import React, { Component } from 'react';
import api from '../../helper/endpoints';
import CheckoutDetail from '../../components/checkoutDetail';
import moment from 'moment';
import queryString from 'query-string';
import { Elements } from 'react-stripe-elements';
import StripeForm from '../../components/stripeForm';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
      cardholder: "",
      reservation: {
        hotel: {}
      },
      error: '',
    };
  }

  componentWillMount() {
    this.loadUserData()
    this.parseParams()
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
        data["data"]["cardholder"] = data['data'].firstName+" "+data['data'].lastName
        this.setState({ user: data['data'] })
      })
    } else {
      this.props.history.push(`/login`);
    }
  }

  parseParams = () => {
    const values = queryString.parse(this.props.location.search)

    // Parse rooms from URL
    var rooms = []
    var roomsString = values.rooms.split(",")
    for(let index in roomsString) {
      let room = roomsString[index].split(":")
      if(room[0] !== "") {
        rooms.push({
          "roomTypeId": parseInt(room[0]),
          "count": parseInt(room[1])
        })
      }
    }

    this.setState(prev => ({
      reservation: {
        ...prev.reservation, 
        startDate: values.startDate,
        endDate: values.endDate,
        hotelId: values.hotelId,
        rooms
      }
    }), () => this.loadHotelInfo() );
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
      this.setState(prev => ({reservation: {...prev.reservation, hotel: data['data']}}))
      this.calculatePrice()
    })
  }

  calculatePrice = () => {
    const nights = moment(this.state.reservation.endDate).diff(this.state.reservation.startDate, 'days')
    var nightlyPrice = 0.0
    var roomsString = ""
    this.state.reservation.hotel.rooms.forEach(room => {
      let rooms = this.state.reservation.rooms.find(item => item.roomTypeId === room.roomTypeId)
      if(rooms !== undefined) {
        nightlyPrice += rooms.count*room.price
        roomsString += "\u00a0\u00a0\u00a0"+rooms.count+" "+room.title
      }
    })
    this.setState(prev => ({reservation: {...prev.reservation, nightlyPrice, nights, total: nightlyPrice*nights, roomsString}}))
  }

  handleChange = (event) => {
    this.setState({
      user: {[event.target.id]: event.target.value}
    });
  }

  handleSubmit = (type) => {
    let reservation = this.state.reservation
    
    var stripeToken = ""
    var useRewardPoints = false

    if(type === "Rewards") {
      useRewardPoints = true
    } else {
        stripeToken = type
    }

    const token = window.localStorage.getItem("token")
    let bodyJSON = { 
      hotelId: parseInt(reservation.hotelId),
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      stripeToken,
      rooms: reservation.rooms
    }

    fetch(api + "/reservations/", {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyJSON)
    }).then(results => {
      return results.json();
    }).then(data => {
      console.log(data)
      if (data["error"]) {
        alert(data["message"])
      } else {
        this.props.history.push(`/confirmation/${data["data"].reservationId}`)
      }
    })
  }

  rewardsDiv = () => {
    if(this.state.reservation.total*2 <= this.state.user.rewardPoints) {
      return [
        <div className="mt-8 pb-8 border-b">
           <p className="text-dark-blue text-sans font-bold text-2xl">You are eligible for a free stay</p>
           <div className="mt-8 flex items-flex">
            <p className="w-full text-sans font-bold text-xl">Your Balance:</p>
            <p className="w-full text-sans font-bold text-xl text-right">{this.state.user.rewardPoints}</p>
           </div>
           <div className="mt-2 flex items-flex">
            <p className="w-full text-sans font-bold text-xl">Points needed:</p>
            <p className="w-full text-sans font-bold text-xl text-right">{this.state.reservation.total*2}</p>
           </div>
           <button className="mt-8 bg-soft-blue rounded text-white py-3 px-4 font-sans text-xl font-bold" onClick={() => this.handleSubmit("Rewards")}>Redeem</button>
        </div>
      ]
    } else {
      return []
    }
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
                <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="lastName" value={this.state.user.lastName} onChange={this.handleChange} type="text" placeholder="Last Name" />
              </div>
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full md:w-3/5 rounded h-14 mt-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="email" value={this.state.user.email} onChange={this.handleChange} type="text" placeholder="E-mail" />
            </div>
            {this.rewardsDiv()}
            <div className="mt-8 pb-8 border-b">
              <p className="text-sans font-bold text-2xl mb-4">Payment Information</p>
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full md:w-3/5 rounded h-14 mb-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="cardholder" value={this.state.user.cardholder} onChange={this.handleChange} type="text" placeholder="Cardholder name" />
              <Elements>
                <StripeForm sendToken={this.handleSubmit} name={this.state.user.firstName+" "+this.state.user.lastName}/>
              </Elements>
            </div>
          </div>
          <div className="md:w-1/3 md:mx-4 mt-8 md:mt-0">
            <CheckoutDetail reservation={this.state.reservation} />
          </div>
      </div>
    );
  }
}

export default Checkout;
