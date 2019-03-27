import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
import api from '../helper/endpoints';

class Resetcomp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        p1:'',
        p2:'',
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
    let token = this.props.match.params.token;
    let success = false;
    let user = {
    "password": this.state.p1,
    "confirm_password": this.state.p2,
    "token":token
  };
  console.log(user);
  event.preventDefault();

  fetch(api+"/auth/reset_password", {
    method: "PUT",
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
        if(data["message"]["password"]){
          this.setState({
              error : data["message"]["password"]
          });
        }
        else if(data["message"]["confirm_password"]){
            this.setState({
                error : data["message"]["confirm_password"]
            });
        }
        else if(data["message"]["token"]) {
          this.setState({      
            error : data["message"]["token"]
          });
        }
        else{
            this.setState({      
                error : data["message"]
              });
        }

         
      
      }
  }.bind(this));
}

  render() {
      console.log(this.props.match.params.token);
    return (
      <div className="flex items-center h-full w-full">
        <div className="container-sm mx-auto pt-24 bg-white rounded">
        <p className="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-14">
          Reset your password
        </p>
        <form className=" mt-4 mb-4 items-center" onSubmit={this.apiforgotpass}>
        <div className="flex mt-6 flex-col mb-4 items-center justify-center">
            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 justify-center py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="email" onChange={this.handleChange} type="password" placeholder="New password"/>
        </div>
        <div class="flex flex-col items-center">
            <input class="shadow appearance-none mb-2 bg-white font-bold border border-soft-blue w-full rounded justify-center  h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="password"  onChange={this.handleChange} type="password" placeholder=" Re-enter new password"/>

        </div>
        {/* <div class="flex justify-left mb-8 ml-10px items-center">
        <button class="flex text-soft-blue hover:text-blue text-xs " value="forgot" onClick={e => this.goTo(e)} style={{cursor: 'pointer'}}>Forgot your Password?</button>
        </div> */}

         {/* Backend message */}
         <div className="flex items-center font-bold">
          {/* <p>backend message goes here</p> */}
          <p class="text-red">{this.state.error}</p>
        </div>

        <div className="flex items-center justify-center">
            <input onClick = {this.handleSubmit} class="Rectangle mt-4 h-14 text-lg w-full bg-soft-blue text-white font-bold py-2 px-4 rounded" type="submit" value="Change password" />
        </div>
        </form>
        {/* <div className="flex justify-center col-md-6 items-center"> 
                <p className="items-center mr-1 text-s text-grey"> New to Hotel Hopper?</p>
                <button className="items-center ml-1 text-soft-blue font-sans text-bold hover:text-blue text-s font-bold " 
                value="signUp" onClick={e => this.goTo(e)} style={{cursor: 'pointer'}}>Create an Account</button>
        </div> */}
        </div>     
      </div>
    );
  }
}

export default withRouter(Resetcomp);
