import React, { Component } from "react";
import BookingDetail from "../../components/bookingDetailComp";
import RewardsCard from "../../components/rewardsCard";
import api from "../../helper/endpoints";

class Confirmation extends Component {
  constructor(props) {
    super(props);

    let booking = {
      hotel: {
        title: "MGM Grand Hotel & Casino",
        image:
          "https://mgmgrand.mgmresorts.com/content/dam/MGM/mgm-grand/hotel/mgm-grand/exterior/mgm-grand-hotel-mgm-grand-exterior-hero-shot-@2x.jpg",
        street: "3799 Las Vegas Blvd S",
        city: "Las Vegas", 
        state: "NV",
        rating: "8.6",
        stars: 4,
      },
      id: "123",
      roomType: "Grand Queen Room",
      startDate: "2019-06-08",
      endDate: "2019-06-14",
      status: "approved"
    };

    this.state = {
      user: {},
      reservation: booking,
      pointsEarn: 350
    };
  }

  componentWillMount() {
    this.fetchReservation()
    this.fetchPoints()
  }

  fetchReservation() {
    let id = this.props.match.params.params
    console.log(id)
    // fetch with id
  }

  fetchPoints() {
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

  render() {
    return (
      <div className="App">
        <div className="">
          <div className="w-full-w/o-margins md:max-w-xl mx-auto">
            <p className="text-2xl md:text-4xl text-dark-blue font-sans font-bold my-4 md:my-8">
              Your Booking Details
            </p>

            <BookingDetail reservation={this.state.reservation} />
            <hr className="pt-4 md:pt-8 border-b" />
            <p className="text-sm md:text-2xl my-4 md:my-8 font-bold">
              You will collect {this.state.pointsEarn} additional points upon staying.
            </p>
            <RewardsCard points={this.state.user.rewardPoints} />
            <hr className="pt-4 md:pt-8 border-b" />
            <button className="bg-white text-red md:text-2xl border-red border md:border-2 rounded md:rounded-lg p-2 md:p-4 float-right mt-4 md:mt8 mb-6 hover:bg-red hover:text-white">
              Cancel the room
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmation;
