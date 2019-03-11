
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
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
        <Button value="checkout" class="float-right" onClick={e => this.onClick(e)}> Checkout</Button>
        <Button value="confirmation" class="float-right" onClick={e => this.onClick(e)}> Confirm</Button>
        <Button value="forgot" class="float-right" onClick={e => this.onClick(e)}> Forgot</Button>
        <Button value="hotel" class="float-right" onClick={e => this.onClick(e)}> Hotel</Button>
        <Button value="login" class="float-right" onClick={e => this.onClick(e)}> Login</Button>
        <Button value="map" class="float-right" onClick={e => this.onClick(e)}> Map</Button>
		<Button value="profile" class="float-right" onClick={e => this.onClick(e)}> Profile</Button>
        <Button value="reset" class="float-right" onClick={e => this.onClick(e)}> Reset</Button>
        <Button value="search" class="float-right" onClick={e => this.onClick(e)}> Search</Button>
        <Button value="signup" class="float-right" onClick={e => this.onClick(e)}> SignUp</Button>
		</div>
		)	
	}
}

export default withRouter(Bar);
