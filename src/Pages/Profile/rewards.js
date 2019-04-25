import React, { Component } from "react";
import SideMenu from "../../components/sidemenu";
import RewardsCard from "../../components/rewardsCard";
import { Accordion, Card } from "react-bootstrap";
import api from "../../helper/endpoints";

class Rewards extends Component {
  constructor() {
    super();
    this.state = {
      points: 0,
      token: null
    };

    this.storageUpdated = this.storageUpdated.bind(this);
    this.getUserRewards = this.getUserRewards.bind(this);
  }

  storageUpdated() {
    if (window.localStorage.getItem("token") !== this.state.token) {
      this.setState({
        token: window.localStorage.getItem("token")
      });
    }
  }

  getUserRewards() {
    {
      /*console.log(fetch(api + "/getUserDetails?" + this.state.token));*/
    }
    fetch(api + "/auth/getUserDetails", {
      authorization: {
        bearer: this.state.token
      }
    })
      .then(results => {
        return results.json();
      })
      .then(function(data) {
        console.log(data);
      });
    {
      /*fetch(api + "/getUserDetails")
      .then(results => {
        console.log(results.json());
        return results.json();
      })
      .then(destinationsJson => {
        this.setState({
          popularDestinations: destinationsJson["data"]["user"]["rewardsPoint"]
        });
      });*/
    }
  }

  render() {
    this.storageUpdated();

    this.getUserRewards();
    return (
      <div className="mt-4 md:mt-16 flex items-flex pb-8">
        {window.innerWidth > 415 && (
          <SideMenu
            selected="Rewards"
            items={["Profile", "Billing Info", "Trips", "Rewards"]}
          />
        )}
        <div className="container mx-auto">
          <div className="flex mt-4 justify-center">
            <div className="bg-soft-blue rounded-lg max-w-sm md:max-w-lg text-white font-sans font-bold md:h-64">
              <div className="flex items-flex justify-center">
                <RewardsCard points={this.state.points} />
              </div>
              <hr className="mt-4 border bg-blue" />
              <h1 className="text-black mt-4 mb-4 ">
                Frequently asked questions
              </h1>
              <div className="text-black">
                <h2>QUestion 1: Problem 1</h2>
                <h5>Answer 1: Solution 1</h5>
                <h2>QUestion 2: Problem 2</h2>
                <h5>Answer 2: Solution 2</h5>
                <h2>QUestion 3: Problem 3</h2>
                <h5>Answer 3: Solution 3</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rewards;
