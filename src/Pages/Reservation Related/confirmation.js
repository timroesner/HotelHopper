import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import BookingDetail from "../../components/bookingDetailComp";
import RewardsCard from "../../components/rewardsCard";
import api from "../../helper/endpoints";

class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      reservation: {
        hotel: {
          imageUrl: ""
        }
      }
    };
  }

  componentWillMount() {
    this.fetchReservation()
    this.fetchPoints()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  fetchReservation() {
    const id = this.props.match.params.params
    const token = window.localStorage.getItem("token")

    if(token !== null) {
      fetch(api + "/reservations/"+id, {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': "Bearer "+token
        }
      }).then(results => {
          return results.json();
      }).then(data => {
        if(data["error"]) {
          this.props.history.push("/error")
        } else {
          this.setState({reservation: data["data"]})
        }
      })
    } else {
      this.props.history.push(`/login`);
    }
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

  handleCancel = () => {
    const id = this.props.match.params.params
    const token = window.localStorage.getItem("token")

    fetch(api + `/reservations/${id}/cancel`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Authorization': "Bearer "+token
      }
    }).then(results => {
        return results.json();
    }).then(data => {
      if (data["error"]) {
        alert(data["message"])
      } else {
        this.props.history.push("/trips")
      }
    })
  }

  render() {
    return (
      <div className="w-full-w/o-margins md:max-w-xl mx-auto">
        <p className="text-2xl md:text-4xl text-dark-blue font-sans font-bold my-4 md:my-8">
          Your Booking Details
        </p>
        <BookingDetail reservation={this.state.reservation} />
        <hr className="pt-4 mb-4 md:pt-8 md:mb-8 border-b" />
        {
          this.state.reservation.usePoints === false &&
          <p className="text-sm md:text-2xl mb-4 md:mb-8 font-bold">
            You will collect {parseInt(this.state.reservation.totalCost*0.10)} additional points upon staying.
          </p>
        }
        <RewardsCard points={this.state.user.rewardPoints} />
        <hr className="pt-4 md:pt-8 border-b" />
        <button className="bg-white text-red md:text-2xl border-red border md:border-2 rounded md:rounded-lg p-2 md:p-4 float-right mt-4 md:mt8 mb-6 hover:bg-red hover:text-white"
        onClick={this.handleCancel}>
          Cancel Reservation
        </button>
      </div>
    );
  }
}

export default withRouter(Confirmation);
