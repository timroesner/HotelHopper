import React, { Component } from "react";
import logo from "../../assets/logo.svg";
import MapContainer from "./MapContainer";

class Map extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header" />
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default Map;
