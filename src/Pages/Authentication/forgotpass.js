import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../helper/endpoints';

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
      success: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  goTo(event) {
    const value = event.target.value;
    this.props.history.push(`/${value}`);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      error: null,
      success: null,
    })

    let user = {
      "email": this.state.email
    };

    fetch(api + "/auth/forgot_password", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data["error"]) {
        let message = data["message"]
        if (typeof(message) !== String && typeof(message) === 'object') {
          let errorMsg = '';
          for (var prop in message){
            errorMsg = message[prop];
            break;
          }
          this.setState({
            error: errorMsg
          });
        } else {
          this.setState({
            error: data["message"]
          });
        }
      } else {
        console.log("Success")
        this.setState({
          success: data['message']
        })
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="flex items-center h-full w-full">
        <div className="container-sm w-full-w/o-margins max-w-sm mx-auto pt-24 bg-white rounded">
          <p className="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-16">
            Forgot your password?
          </p>
          <div className="mt-2 content-between">
            <p class="text-center content-between">Enter the email you signed up with below and we'll send you instructions on how to securely reset your password</p>
          </div>

          <form className="mt-4 mb-4 items-center content-between" onSubmit={this.apiforgotpass}>
            <div className="flex flex-col mb-4 items-center justify-center">
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 justify-center py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="email" onChange={this.handleChange} type="text" placeholder="example@gmail.com" />
            </div>
            {
              this.state.error &&
              <div className="flex items-center font-bold mb-4">
                <p class="text-red text-center">{this.state.error}</p>
              </div>
            }
            {
              this.state.success &&
              <div className="flex items-center font-bold mb-4">
                <p class="text-soft-blue text-center ">{this.state.success}</p>
              </div>
            }
            <div className="flex items-center justify-center">
              <input onClick={this.handleSubmit} class="Rectangle bg-soft-blue h-14 text-lg w-full hover:bg-blue text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit" value="Send Reset Link" />
            </div>
          </form>
          <div className="flex justify-center col-md-6 items-center">
            <p className="items-center mr-1 text-s text-grey"> New to Hotel Hopper?</p>
            <button className="items-center ml-1 text-soft-blue font-sans text-bold hover:text-blue text-sm md:text-base font-bold "
              value="signUp" onClick={e => this.goTo(e)} style={{ cursor: 'pointer' }}>Create an Account</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Forgot);

