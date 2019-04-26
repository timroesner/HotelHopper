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
      pastTrips: []
    }
  }

  componentWillMount() {
    this.fetchTrips()
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
          pastTrips: pastTrips
        })
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
            <p className="text-xl md:text-3xl text-grey-darkest font-bold -mb-4">Upcoming Trips</p>
            {this.state.upcomingTrips.map(item => <TripCell reservation={item}/>)}
          </div>
        }
        {
          this.state.pastTrips.length > 0 &&
          <div className="mt-8 md:mt-12">
            <p className="text-xl md:text-3xl text-grey-darkest font-bold -mb-4">Past Trips</p>
            {this.state.pastTrips.map(item => <TripCell reservation={item}/>)}
          </div>
        }
        </div>
      </div>
    );
  }
}

export default Trips;
