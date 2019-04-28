import React, { Component } from 'react';
import SideMenu from '../../components/sidemenu';
import api from '../../helper/endpoints';

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this.loadUserData()
  }

  loadUserData = () => {
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

  handleChange = (event) => {
    this.setState({
      user: {[event.target.id]: event.target.value}
    });
  }

  handleSubmit = (type) => {
    if(type === "Basic") {

    } else {

    }
  }

  render() {
    return (
      <div className="mt-4 md:mt-16 flex items-flex pb-8">
        {
          window.innerWidth > 415 &&
          <SideMenu selected="Profile" items={["Profile", "Billing Info", "Trips", "Rewards"]} />
        }
        <div className="mx-4 md:ml-24 ">
          <p className="text-sans font-bold text-2xl">Basic Information</p>
          <div className="mt-4 flex items-flex">
            <input className="shadow appearance-none bg-white font-bold mr-4 border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="firstName" value={this.state.user.firstName} onChange={this.handleChange} type="text" placeholder="First Name" />
            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="lastName" value={this.state.user.lastName} onChange={this.handleChange} type="text" placeholder="Last Name" />
          </div>
          <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full md:w-3/5 rounded h-14 mt-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="email" disabled value={this.state.user.email} onChange={this.handleChange} type="text" placeholder="E-mail" />
          <br/>
          <button className="mt-4 bg-soft-blue rounded text-white py-3 px-4 font-sans text-xl font-bold" 
          onClick={() => this.handleSubmit("Basic")}>Save changes</button>
          {/* ------------------------ */}
          <hr className="my-4 md:my-8 border-b"/>
          <p className="text-sans font-bold text-2xl">Reset login e-mail</p>
          <div className="mt-4 flex items-flex flex-col md:flex-row">
            <input className="shadow appearance-none bg-white font-bold mr-4 border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="oldEmail" value={this.state.user.oldEmail} onChange={this.handleChange} type="text" placeholder="Old e-mail" />
            <input className="mt-4 md:mt-0 shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="password" value={this.state.user.password} onChange={this.handleChange} type="password" placeholder="Password" />
          </div>
          <input className="mt-4 shadow appearance-none bg-white font-bold border border-soft-blue w-full md:w-3/5 rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="newEmail" disabled value={this.state.user.newEmail} onChange={this.handleChange} type="text" placeholder="New e-mail" />
          <br/>
          <button className="mt-4 bg-soft-blue rounded text-white py-3 px-4 font-sans text-xl font-bold" 
          onClick={() => this.handleSubmit("Reset")}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Profile;
