
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.svg';

class Header extends React.Component {
	constructor(props){
		  super(props);
		  this.state = {name: ''}
   }

   navigateTo(page) {
      this.props.history.push(`/${page}`);
   }
   
	render() {
    return (
       <div className="h-16 w-full bg-white border-b-2 flex items-center fixed">
         <img src={logo} className="ml-8 h-4/5" alt="logo" />
         <p className="ml-3 text-soft-blue font-sans text-xl font-bold tracking-wide leading-none cursor-pointer" onClick={() => this.navigateTo("")}>Hotel<br/>Hopper</p>
         {
            this.props.user ? 
            <div></div> :
            <div className="mr-8 ml-auto">
               <Button className="mr-4 bg-soft-blue rounded text-white p-2 font-sans text-xl font-bold tracking-wide" onClick={() => this.navigateTo("signup")}>Sign up</Button>
               <Button className="font-sans text-xl font-bold tracking-wide" onClick={() => this.navigateTo("login")}>Log in</Button>
            </div>
         }
       </div>
		)	
	}
}

export default withRouter(Header);
