import React, { Component } from "react";
import logo from "../assets/logo.svg";

class RewardsCard extends Component {
  render() {
    const points = this.props.points;
    return (
      <div className="container mx-auto">
        <div className="flex mt-4 justify-center">
          <div className="bg-soft-blue rounded-lg max-w-sm md:max-w-lg text-white font-sans font-bold md:h-64">
            <div className="flex items-flex justify-center">
              <div className="md:h-64">
                <div className="mt-2 md:mt-6 ml-2 md:ml-8">
                  <p className="text-xs md:text-2xl">Hotel Hopper</p>
                  <p className="text-xs md:text-3xl">Rewards Program</p>
                </div>
                <p className="text-xs md:text-3xl mt-2 md:mt-6 ml-2 md:ml-8 opacity-75">
                  This is the rewards stuff and you have these many points
                  available
                </p>
              </div>
              <div className="mt-2 md:mt-6 md:pl-6 md:h-64">
                <p className="text-xs md:text-2xl text-soft-blue"> ,</p>
                <p className="text-xs text-center md:text-3xl">
                  Reward Points:
                </p>
                <p className="text-4xl md:text-8xl text-center pl-4 pr-4 md:pl-12 md:pr-12 tracking-tight ">
                  {points}
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
