import React, { Component } from 'react';
import SideMenu from '../../components/sidemenu';

class Profile extends Component {
  render() {
    return (
      <div className="mt-4 md:mt-16 flex items-flex pb-8">
        {
          window.innerWidth > 415 &&
          <SideMenu selected="Profile" items={["Profile", "Billing Info", "Trips", "Rewards"]} />
        }
        <div className="ml-8 md:ml-24 ">
          Your content here
        </div>
      </div>
    );
  }
}

export default Profile;
