import React, { Component } from "react";

class RewardsCard extends Component {
  render() {
    return (
      <div className="bg-soft-blue rounded-lg md:rounded-xl md:max-w-xl mx-auto text-white font-sans font-bold h-28 md:h-54">
        <div className="flex items-flex justify-between">
          <div className="w-3/5 md:h-64 ml-2 md:ml-6">
            <div className="mt-2 md:mt-6">
              <p className="text-sm md:text-2xl">Hotel Hopper</p>
              <p className="text-base md:text-3xl">Rewards Program</p>
            </div>
            <p className="font-normal md:font-bold md:w-full-w/o-margins text-xs md:text-2xl mt-2 md:mt-10 opacity-75">
              These points can be redeemed for a free stay. You earn them by staying with us.
            </p>
          </div>
          <div className="mt-4 md:mt-8 mr-2 md:mr-6 md:h-64">
            <p className="text-sm text-center md:text-3xl">
              Reward Points:
            </p>
            <p className="text-5xl md:text-8xl text-center pl-4 pr-4 mt-2 md:pl-12 md:pr-12 tracking-tight ">
              {this.props.points}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RewardsCard;
