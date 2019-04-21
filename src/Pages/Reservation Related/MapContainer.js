import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "90%"
};

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD7HpL4M6oNMhtHBhEIlAnJp-BAAvWsSTA"
})(MapContainer);
