import React, { Component } from 'react';
import SideMenu from '../../components/sidemenu';
import TripCell from '../../components/tripCell'
import * as moment from 'moment';
import api from '../../helper/endpoints'

class Trips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upcomingTrips: [],
      pastTrips: [],
      loaded:false,
    }
  }

  componentWillMount() {

    this.fetchTrips();
  }

  fetchTrips = () => {
    const token = window.localStorage.getItem("token")
    if(token !== null) {
      fetch(api + "/reservations/", {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': "Bearer "+token
        }
      }).then(results => {
          return results.json();
      }).then(data => {
        let trips = data['data']
        const upcomingTrips = trips.filter(reservation => moment(reservation.endDate) >=  moment() && reservation.status !== "canceled")
        upcomingTrips.sort(function(a, b) {return moment(a.startDate) > moment(b.startDate) })
    
        const pastTrips = trips.filter(reservation => moment(reservation.endDate) <  moment() || reservation.status === "canceled")
        pastTrips.sort(function(a, b) {return moment(a.startDate) < moment(b.startDate) })

        this.setState({
          upcomingTrips: upcomingTrips,
          pastTrips: pastTrips,
          loaded:true
        })

      })
    } else {
      this.props.history.push(`/login`);
    }
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
  render() {
    return (
      <div className="mt-4 md:mt-16 flex items-flex pb-8">
        {
          window.innerWidth > 415 &&
          <SideMenu selected="Trips" items={["Profile", "Billing Info", "Trips", "Rewards"]} />
        }
        <div className="ml-8 md:ml-24 ">
        {
          this.state.upcomingTrips.length > 0 &&
          <div>
            <p className="text-xl md:text-3xl text-grey-darkest font-bold">Upcoming Trips</p>
            {this.state.upcomingTrips.map(item => <TripCell reservation={item}/>)}
          </div>
        }
        {
          this.state.pastTrips.length > 0 &&
          <div className="mt-8 md:mt-12">
            <p className="text-xl md:text-3xl text-grey-darkest font-bold">Past Trips</p>
            {this.state.pastTrips.map(item => <TripCell reservation={item}/>)}
          </div>
        }
        {
          this.state.pastTrips.length === 0 && this.state.upcomingTrips.length === 0 && this.state.loaded === true &&
          <div className="text-center w-full justify-center ">
          <div className="mt-8 md:mt-12 text-3xl font-bold mr-8 md:mr-0 ">
            No trips have been made yet. 
          </div>
          <div className="mt-8 md:mt-12 text-3xl font-bold mr-8 md:mr-0 ">
          Plan your next trip now!
        </div>
        </div>
        }
        </div>
      </div>
    );
  }
}

export default Trips;
