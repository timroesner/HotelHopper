import React, { Component } from "react";
import logo from "../assets/logo.svg";

class RewardsCard extends Component {
  render() {
    const points = this.props.points;
    return (
      <div className="container mx-auto">
        <div className="flex mt-4 justify-center">
          <div className="bg-soft-blue rounded-lg max-w-sm md:max-w-lg text-white font-sans font-bold md:h-54">
            <div className="flex items-flex justify-center">
              <div className="md:h-54">
                <div className="mt-2 md:mt-6 ml-2 md:ml-8">
                  <p className="text-xs md:text-2xl">Hotel Hopper</p>
                  <p className="text-xs md:text-3xl">Rewards Program</p>
                </div>
                <p className="text-xs md:text-2xl mt-2 md:mt-6 ml-2 md:ml-8 opacity-75">
                  Thank you for choosing Hotel Hopper as your booking website.
                  <br />
                  Here are the points you have accumulated
                </p>
              </div>
              <div className="mt-2 md:mt-6 md:h-54">
                <p className="text-xs md:pt-6 text-center md:text-3xl">
                  Reward Points:
                </p>
                <p className="text-4xl md:text-8xl text-center mt-2 md:mt-6 pl-4 pr-4 md:pl-24 md:pr-24 tracking-tight ">
                  {this.props.points}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RewardsCard;
