import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.svg';

class Header extends React.Component {
	constructor(props){
        super(props);
		  this.state = {
           token: null,
           showDropdown: false,
           user: {
              name: '',
           }
         }
   }

   createDropDowm = () => {
      let dropDown = []
      const dropDownItems = ["Profile", "Billing Info", "Trips", "Rewards", "Sign out"]
      dropDownItems.map((item) => dropDown.push(<p className="pb-2 pt-2 hover:text-soft-blue" onClick={() => this.navigateTo(item.replace(/\s/g, '').toLowerCase())}>{item}</p>))
      return dropDown
   }

   navigateTo(page) {
      if(page === "signout") {
         // Call signout function
         this.setState({ token: undefined });
         window.localStorage.removeItem("token");
      } else {
         this.props.history.push(`/${page}`);
      }
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
      if(window.localStorage.getItem("token") != null){
         this.state.token = window.localStorage.getItem("token");
         this.state.user.name = window.localStorage.getItem("name");
         console.log(this.state.token);
      }
    return (
       <div className="h-16 w-full bg-white border-b-2 flex items-center fixed">
         <img src={logo} className="ml-8 h-4/5 cursor-pointer" alt="logo" onClick={() => this.navigateTo("")} />
         <p className="ml-3 text-soft-blue font-sans text-xl font-bold leading-none cursor-pointer" onClick={() => this.navigateTo("")}>Hotel<br/>Hopper</p>
         {
            this.state.token ? 
            <div className="mr-8 ml-auto cursor-pointer" onClick={() => this.handleDropdown()} onMouseEnter={() => this.handleDropdown()}  onMouseLeave={() => this.handleDropdown()} >
               <p className="font-sans text-xl font-bold">Hi, {this.state.user.name}</p>
               {
                  this.state.showDropdown &&
                  <div className="mr-4 pr-12 pl-8 pt-2 pb-2 pin-r absolute bg-grey-lightest rounded ">
                        {this.createDropDowm()}
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