import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Dialog from "../../assets/dialog.png";
import HotelCell from '../../components/searchCell';

const mapStyles = {
  width: "100%",
  height: "92%",
  position: "relative"
};

// const infoDivStyles = {
//   position: "absolute",
//   backgroundColor: "white",
//   bottom: -40
// }

// const textLeft = {
//   textAlign: "left",
//   display: "inline-block"
// }

// const textRight = {
//   float: "right",
//   display: "inline-block"
// }

// const textLeftWPadding = {
//   textAlign: "left",
//   paddingTop: 6,
//   display: "inline-block"
// }

export class MapPage extends Component {
  constructor() {
    super();
    
    this.state = {
      selectedKey: -1,
      showingInfoWindow: false
    };
  }

  componentWillMount() {
    this.setState(this.props.location.state)
  }

  onMarkerClick = (props) => {
    this.setState({ selectedKey: props.name })
  }

  markers = () => {
    let markers = []
    for (let i = 0; i < this.state.hotels.length; i++) {
      const hotel = this.state.hotels[i];
      markers.push(
        <Marker
          key={i}
          onClick={this.onMarkerClick}
          name={i}
          position={{ lat: hotel.latitude, lng: hotel.longitude }}
          label={"$" + hotel.lowestPrice}
          icon={{
            url: Dialog,
            scaledSize: new this.props.google.maps.Size(80, 50),
            strokeColor: "blue"
          }}
        />
      );
    }
    return markers
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.long
          }}
        >
          {this.markers()}
        </Map>
        {this.state.selectedKey === -1 ?
        <div className="bg-white z-20 pin-b w-80% mx-auto rounded justify-center absolute">
          <HotelCell hotel={this.state.hotels[2]}/>
        </div> : null}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD7HpL4M6oNMhtHBhEIlAnJp-BAAvWsSTA"
})(MapPage);
