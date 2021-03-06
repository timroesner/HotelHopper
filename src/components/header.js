import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../assets/logo.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      showDropdown: false,
      user: null
    };
    this.storageUpdated = this.storageUpdated.bind(this);
  }

  storageUpdated() {
    if (window.localStorage.getItem("token") !== this.state.token) {
      this.setState({
        token: window.localStorage.getItem("token"),
        user: JSON.parse(window.localStorage.getItem("currentUser"))
      });
    }
  }

  createDropDowm = () => {
    let dropDown = [];
    const dropDownItems = [
      "Profile",
      "Billing Info",
      "Trips",
      "Rewards",
      "Sign out"
    ];
    dropDownItems.map(item =>
      dropDown.push(
        <p
          key={item}
          className="pb-2 pt-2 hover:text-soft-blue"
          onClick={() => this.navigateTo(item.replace(/\s/g, "").toLowerCase())}
        >
          {item}
        </p>
      )
    );
    return dropDown;
  };

  navigateTo(page) {
    if (page === "signout") {
      this.setState({ token: undefined });
      window.localStorage.removeItem("token");
      window.location.reload();
    } else {
      this.props.history.push(`/${page}`);
    }
  }

  handleDropdown() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      showDropdown: !state.showDropdown
    };
  }

  render() {
    this.storageUpdated();
    return (
      <div className="z-50 h-16 w-full bg-white border-b-2 flex items-center fixed">
        <img
          src={logo}
          className="ml-8 h-4/5 cursor-pointer"
          alt="logo"
          onClick={() => this.navigateTo("")}
        />
        <p
          className="ml-3 text-soft-blue font-sans text-xl font-bold leading-none cursor-pointer"
          onClick={() => this.navigateTo("")}
        >
          Hotel
          <br />
          Hopper
        </p>
        {this.state.token ? (
          <div
            className="mr-8 ml-auto cursor-pointer"
            onClick={() => this.handleDropdown()}
            onMouseEnter={() => this.handleDropdown()}
            onMouseLeave={() => this.handleDropdown()}
          >
            <p className="font-sans text-xl font-bold py-2">
              Hi, {this.state.user.firstName}
            </p>
            {this.state.showDropdown && (
              <div className="mr-4 pr-12 pl-8 pt-2 pb-2 pin-r absolute bg-white rounded border-2">
                {this.createDropDowm()}
              </div>
            )}
          </div>
        ) : (
          <div className="mr-8 ml-auto">
            <button
              className="mr-4 bg-soft-blue rounded text-white p-2 font-sans text-xl font-bold"
              onClick={() => this.navigateTo("signup")}
            >
              Sign up
            </button>
            <button
              className="font-sans text-xl font-bold"
              onClick={() => this.navigateTo("login")}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
