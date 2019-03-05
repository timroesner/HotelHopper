
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';

class Bar extends React.Component {
	constructor(props){
		  super(props);
		  var that = this;
		  this.state = {name:''}
  		
 }
 onClick(event) {
    const value = event.target.value;
    this.props.history.push(`/${value}`);
  }
	render() {

    	return (
		<div class="text-right">     
		<Button value="" class="float-right" onClick={e => this.onClick(e)}> Home</Button>
		<Button value="profile" class="float-right" onClick={e => this.onClick(e)}> Profile</Button>
        <Button value="signup" class="float-right" onClick={e => this.onClick(e)}> SignUp</Button>
        <Button value="search" class="float-right" onClick={e => this.onClick(e)}> Search</Button>
		</div>
		)	
	}
}

export default withRouter(Bar);
