import React, { Component } from "react";
import SideMenu from "../../components/sidemenu";

class Rewards extends Component {
  render() {
    return (
      <div className="mt-4 md:mt-16 flex items-flex pb-8">
        {window.innerWidth > 415 && (
          <SideMenu
            selected="Rewards"
            items={["Profile", "Billing Info", "Trips", "Rewards"]}
          />
        )}
        <div className="ml-8 md:ml-24 ">Your content here elrkekh</div>
      </div>
    );
  }
}

export default Rewards;
