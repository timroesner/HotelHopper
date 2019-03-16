
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.svg';

class Header extends React.Component {
	constructor(props){
        super(props);
		  this.state = {
           showDropdown: false,
           user: {
              name: "Tim"
           }
         }
   }

   navigateTo(page) {
      this.props.history.push(`/${page}`);
   }

   handleDropdown() {
      this.setState(this.toggleHoverState);
    }
  
    toggleHoverState(state) {
      return {
         showDropdown: !state.showDropdown,
      };
    }

	render() {
    return (
       <div className="h-16 w-full bg-white border-b-2 flex items-center fixed">
         <img src={logo} className="ml-8 h-4/5 cursor-pointer" alt="logo" onClick={() => this.navigateTo("")} />
         <p className="ml-3 text-soft-blue font-sans text-xl font-bold leading-none cursor-pointer" onClick={() => this.navigateTo("")}>Hotel<br/>Hopper</p>
         {
            this.state.user ? 
            <div className="mr-8 ml-auto cursor-pointer" onMouseEnter={() => this.handleDropdown()} onMouseLeave={() => this.handleDropdown()} >
               <p className="font-sans text-xl font-bold" >Hi, {this.state.user.name}</p>
               {
                  this.state.showDropdown &&
                  <div className="pin-r absolute bg-white rounded border-1">
                     <ul>Profile</ul>
                     <ul>Billing Info</ul>
                     <ul>Trips</ul>
                     <ul>Rewards</ul>
                     <ul>Sign out</ul>
                  </div>
               }
            </div> :
            <div className="mr-8 ml-auto">
               <Button className="mr-4 bg-soft-blue rounded text-white p-2 font-sans text-xl font-bold" onClick={() => this.navigateTo("signup")}>Sign up</Button>
               <Button className="font-sans text-xl font-bold" onClick={() => this.navigateTo("login")}>Log in</Button>
            </div>
         }
       </div>
		)	
	}
}

export default withRouter(Header);
