import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../helper/endpoints';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p1: '',
      p2: '',
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
    console.log(value);
    this.props.history.push(`/${value}`);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      error: null,
      success: null,
    })

    let token = this.props.match.params.token;
    let user = {
      "password": this.state.p1,
      "confirm_password": this.state.p2,
      "token": token
    };

    fetch(api + "/auth/reset_password", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {

      if (data["error"]) {
        if (data["message"]["password"]) {
          this.setState({
            error: data["message"]["password"]
          });
        }
        else if (data["message"]["confirm_password"]) {
          this.setState({
            error: data["message"]["confirm_password"]
          });
        }
        else if (data["message"]["token"]) {
          this.setState({
            error: data["message"]["token"]
          });
        }
        else {
          this.setState({
            success: data["message"]
          });
        }
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="flex items-center h-full w-full">
        <div className="w-full-w/o-margins max-w-sm container-sm mx-auto mt-1/10 bg-white rounded">
          <p className="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-14">
            Reset your password
          </p>
          <form className=" mt-4 mb-4 items-center" onSubmit={this.apiforgotpass}>
            <div className="flex mt-6 flex-col mb-4 items-center justify-center">
              <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 justify-center py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="email" onChange={this.handleChange} type="password" placeholder="New password" />
            </div>
            <div class="flex flex-col items-center">
              <input class="shadow appearance-none mb-4 bg-white font-bold border border-soft-blue w-full rounded justify-center  h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="password" onChange={this.handleChange} type="password" placeholder=" Re-enter new password" />
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
              <input onClick={this.handleSubmit} class="Rectangle h-14 text-lg w-full bg-soft-blue text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit" value="Change password" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Reset);
