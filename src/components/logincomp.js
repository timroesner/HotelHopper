import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
class LoginComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(this.state.email) ) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
            alert('Logging in with:' + this.state.email + " and " + this.state.password);
        let user = {
            "email": this.state.email,
            "password": this.state.password,
        }
        event.preventDefault();
        this.props.history.push('/');
        }
        else {
            
            // invalid email, maybe show an error to the user.
            alert("Invalid email format detected. Please check to see that email is correctly inputted.");
            event.preventDefault();
        }
        
      }
  render() {
      return(
        
        <div class="flex items-center h-full w-full">
        <div class="container-sm mx-auto pt-24 bg-white rounded">
        <p class="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-14">
        Sign in to Hotel Hopper
        </p>

        <form class="mb-4 items-center" onSubmit={this.handleSubmit}>
        <div class="flex flex-col mb-4 items-center">
            <input class="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="email" onChange={this.handleChange} type="text" placeholder="Enter email"/>
        </div>
        <div class="flex flex-col items-center">
            <input class="shadow appearance-none mb-2 bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="password"  onChange={this.handleChange} type="password" placeholder=" Enter password"/>

        </div>
        <div class="flex justify-left mb-8 ml-10px items-center">
        <button class="flex text-soft-blue hover:text-blue text-xs " value="forgot" onClick={e => this.goTo(e)} style={{cursor: 'pointer'}}>Forgot your Password?</button>
        </div>
        <div class="flex items-center justify-center">
            <input class="Rectangle bg-soft-blue h-14 text-lg w-full hover:bg-blue text-white font-bold py-2 px-4 rounded" type="submit" value="Sign In" />
        </div>
        </form>
        <div class="flex justify-center col-md-6 items-center"> 
                <p class="items-center mr-1 text-s text-grey"> New to Hotel Hopper?</p>
                <button class="items-center ml-1 text-soft-blue font-sans text-bold hover:text-blue text-s font-bold " 
                value="signUp" onClick={e => this.goTo(e)} style={{cursor: 'pointer'}}>Create an Account</button>
        </div>
        </div>     
        </div>
  );
  
  }
  }
export default withRouter(LoginComp);