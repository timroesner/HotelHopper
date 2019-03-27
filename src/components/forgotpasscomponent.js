import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
// import { connect } from "react-redux";
// import { bindActionCreator } from 'redux';
import api from '../helper/endpoints';

class Forgotcomp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        error:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]:event.target.value
    });
  }

  goTo(event) {
    const value = event.target.value;
    console.log(value);
    this.props.history.push(`/${value}`);
  }

  handleSubmit(event) {
    let success = false;
    let user = {
    "email": this.state.email
  };
  console.log(user);
  event.preventDefault();

  fetch(api+"/auth/forgot_password", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify(user)
  }).then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(data){
    console.log("Response recieved");

      if(data["error"]){
        console.log(data);
        if(data["message"]["email"]){
          this.setState({
              error : data["message"]["email"]
          });
        }
        else {
          this.setState({      
            error : data["message"]
          });
        }
         
      }
      else {
        this.setState({
          error : data['message']
        })
      }
  }.bind(this));
}

  // apiforgotpass = (event) => {  
  //   event.preventDefault();
  //  // if (this.state.email == "") {
  //    // alert ('please enter password');
  //     this.props.fetchForgetPass(this.state.email)
  //  // }
  // }
  render() {
    return (
      <div className="flex items-center h-full w-full">
        <div className="container-sm w-1/4 mx-auto pt-24 bg-white rounded">
        <p className="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-16">
          Forgot your password?
        </p>
        <div className= "mt-2 content-between">
          <p class="text-center content-between">Enter the email you signed up with below and we'll send you instructions on how to securely reset your password</p>
        </div>

        <form className="mt-4 mb-4 items-center content-between" onSubmit={this.apiforgotpass}>
        <div className="flex flex-col mb-4 items-center justify-center">
            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 justify-center py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="email" onChange={this.handleChange} type="text" placeholder="example@gmail.com"/>
        </div>


        {/* Backend message */}
        <div className="flex items-center font-bold">
          {/* <p>backend message goes here</p> */}
          <p class="text-red">{this.state.error}</p>
        </div>
        {/* <div class="flex flex-col items-center">
            <input class="shadow appearance-none mb-2 bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="password"  onChange={this.handleChange} type="password" placeholder=" Enter password"/>

        </div> */}
        {/* <div class="flex justify-left mb-8 ml-10px items-center">
        <button class="flex text-soft-blue hover:text-blue text-xs " value="forgot" onClick={e => this.goTo(e)} style={{cursor: 'pointer'}}>Forgot your Password?</button>
        </div> */}
        <div className="flex items-center justify-center">
            <input onClick = {this.handleSubmit} class="Rectangle bg-soft-blue h-14 text-lg w-full  text-white font-bold py-2 px-4 rounded" type="submit" value="Send password reset instructions" />
        </div>
        </form>
        <div className="flex justify-center col-md-6 items-center"> 
                <p className="items-center mr-1 text-s text-grey"> New to Hotel Hopper?</p>
                <button className="items-center ml-1 text-soft-blue font-sans text-bold hover:text-blue text-s font-bold " 
                value="signUp" onClick={e => this.goTo(e)} style={{cursor: 'pointer'}}>Create an Account</button>
        </div>
        </div>     
      </div>
    );
  }
}

export default withRouter(Forgotcomp);

