import React, { Component } from 'react';
import '../index.css';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Signup from '../Pages/Authentication/signup';
import api from '../helper/endpoints';
class SignupComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            secondpassword: '',
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
        let success=false;
        event.preventDefault();
        if(this.state.password == this.state.secondpassword){
        let user = {
          "first_name": this.state.firstname,
          "last_name": this .state.lastname,
          "email": this.state.email,
          "password": this.state.password
          };
          event.preventDefault();
          fetch(api+"/auth/register", {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          body:  JSON.stringify(user)
          })
          .then(function(response){ 
              return response.json();   
          })
          .then(function(data){ 
              if(data["error"]){
                  // if email is incorrect format
                  if(data["message"]["email"]){
                      this.setState({
                          error : data["message"]["email"]
                      });
                  }
                  else if(data["message"]["password"]){
                      this.setState({
                          error : data["message"]["password"]
                      });
                  }
                  else if(data["message"]["first_name"]){
                    this.setState({
                        error : data["message"]["first_name"]
                    });
                }
                else if(data["message"]["last_name"]){
                  this.setState({
                      error : data["message"]["last_name"]
                  });
              }
                  else{
                      this.setState({
                          error : data["message"]
                      });
                  }
              }
              else{
                  success= true;
                  let tokenKey = "token";
                  let tokenValue = data["data"]["token"];
                  window.localStorage.setItem(tokenKey, tokenValue);
                  window.localStorage.setItem("name", this.state.firstname);
                  console.log(data["data"]["token"] );
              }
              console.log("hm" + success);
              if(success){
                  this.props.history.push('/');
              }
              
          }.bind(this));
        }
        else{
          this.setState({
            error : "Passwords do not match."
        });
    
        }
      }

    render() {
      return(
        
        <div class="flex items-center h-full w-full">
        <div class="container-sm w-1/5 mx-auto pt-24 bg-white rounded">
        <p class="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-14">
        Welcome to Hotel Hopper
        </p>

        <form class="mb-4 items-center" onSubmit={this.handleSubmit}>
        <div class="flex flex-col mb-4 items-center">
            <input class="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="firstname" onChange={this.handleChange} type="text" placeholder="First name"/>
        </div>

        <div class="flex flex-col mb-4 items-center">
            <input class="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="lastname" onChange={this.handleChange} type="text" placeholder="Last name"/>
        </div>

        <div class="flex flex-col mb-4 items-center">
            <input class="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="email" onChange={this.handleChange} type="text" placeholder="Enter email"/>
        </div>

        <div class="flex flex-col items-center">
            <input class="shadow appearance-none mb-2 bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="password"  onChange={this.handleChange} type="password" placeholder=" Enter password"/>
        </div>

        <div class="flex flex-col items-center">
            <input class="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline mb-14" 
            id="secondpassword"  onChange={this.handleChange} type="password" placeholder=" Re-enter password"/>
        </div>
        <p class="w-full block text-red text-center font-sans text-s font-bold justify-center mb-4">
        {this.state.error}
        </p>
        <div class="flex items-center justify-center">
            <input class="Rectangle bg-soft-blue h-14 text-lg w-full hover:bg-blue text-white font-bold py-2 px-4 rounded" type="submit" value="Create Account" />
        </div>
        </form>

        <div class="flex justify-center col-md-6 items-center"> 
              <p class="items-center mr-1 text-s text-grey"> Already have an account?</p>
              <Button className="items-center ml-1 text-soft-blue font-sans text-bold hover:text-blue text-s font-bold" 
              value="login" onClick={e => this.goTo(e)} style={{cursor: 'pointer'}}>Sign in</Button>
        </div>
        </div>     
        </div>
      );
  
  }
}

export default withRouter(SignupComp);