import React, { Component } from "react";
import SideMenu from "../../components/sidemenu";
import RewardsCard from "../../components/rewardsCard";
import api from "../../helper/endpoints";

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
        <div className="w-full-w/o-margins mx-auto md:px-24">
          <RewardsCard points={this.state.user.rewardPoints}/>
          <div className="md:max-w-xl mx-auto">
            <hr className="mt-4 border-b"/>
            <h1 className="text-2xl md:text-4xl text-black my-4">Frequently asked questions</h1>
            <p className="md:text-2xl font-semibold">How do I earn points?</p>
            <p className="md:text-xl text-grey-dark mt-2 mb-8">
              You earn 1 reward point per $10 dollars spent. Reward points
              will be deposited to your account after you completed your stay.
            </p>
            <p className="md:text-2xl font-semibold">When can I use reward points?</p>
            <p className="md:text-xl text-grey-dark mt-2 mb-8">
              You can redeem your reward points for a free stay at one of our hotels. The option will automatically appear during checkout
              once you have accumalted enough points. 2 points are equivalent to $1.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Rewards;
