import React, { Component } from 'react';
import SideMenu from '../../components/sidemenu';
import RewardsCard from  '../../components/rewardsCard';
import api from '../../helper/endpoints';

class Rewards extends Component {

  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this.fetchPoints()
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
      <div className="mt-4 md:mt-16 flex items-flex pb-8">
        {
          window.innerWidth > 415 &&
          <SideMenu selected="Rewards" items={["Profile", "Billing Info", "Trips", "Rewards"]} />
        }
        <div className="w-full-w/o-margins max-w-lg mx-auto">
          <RewardsCard points={this.state.user.rewardPoints}/>
        </div>
      </div>
    );
  }
}

export default Rewards;
