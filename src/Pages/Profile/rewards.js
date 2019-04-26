import React, { Component } from "react";
import SideMenu from "../../components/sidemenu";
import RewardsCard from "../../components/rewardsCard";
import api from "../../helper/endpoints";

class Rewards extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    this.fetchPoints();
  }

  fetchPoints() {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      fetch(api + "/auth/userDetails", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
        .then(results => {
          return results.json();
        })
        .then(data => {
          this.setState({ user: data["data"] });
        });
    } else {
      this.props.history.push(`/login`);
    }
  }

  render() {
    return (
      <div>
        <div className="mt-4 md:mt-16 flex items-flex pb-8">
          {window.innerWidth > 415 && (
            <SideMenu
              selected="Rewards"
              items={["Profile", "Billing Info", "Trips", "Rewards"]}
            />
          )}
          <div className="w-full-w/o-margins mx-auto md:px-24">
            <RewardsCard points={this.state.user.rewardPoints} />
            <hr className="mt-4 border" />
            <h1 className="text-black mt-4 mb-4">Frequently asked questions</h1>
            <div className="text-grey">
              <h2>Q: Why do you need my credit card details?</h2>
              <h3 className="text-grey-light pb-2">
                A: They are required as a gaurantee in case you are a no show or
                cancel too late.
              </h3>
              <h2>Q: How do I earn points?</h2>
              <h3 className="text-grey-light pb-2">
                A: You earn 1 reward point per $10 dollars spent. Reward points
                will be deposited to your account after competion of your stay.
              </h3>
              <h2>Q: When can I use reward points?</h2>
              <h3 className="text-grey-light">
                A: You can use reward points towards your stay if you your
                reward points can cover the total cost of your reservation (1
                point = $2 dollars).
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rewards;
