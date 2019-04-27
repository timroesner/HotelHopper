import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import MarkerIcon from "../../assets/Marker.png";
import HotelCell from '../../components/searchCell';

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative"
};

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
    this.state.hotels.forEach((hotel, index) => {
      markers.push(
        <Marker
          key={index}
          onClick={this.onMarkerClick}
          name={index}
          position={{ lat: hotel.latitude, lng: hotel.longitude }}
          label={{
            text: "$" + hotel.lowestPrice,
            color: "white"
          }}
          icon={{
            url: MarkerIcon,
            scaledSize: new this.props.google.maps.Size(60, 30),
          }}
        />
      );
    });
    return markers
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={12}
          containerStyle={{position:'relative', height: window.innerHeight-64 }}
          style={mapStyles}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.long
          }}
        >
          {this.markers()}
        </Map>
        {this.state.selectedKey > -1 ?
        <div className="bg-white z-20 pl-2 md:pl-4 pin-x pin-b w-100% max-w-lg mx-auto md:rounded-t-lg absolute">
          <HotelCell hotel={this.state.hotels[this.state.selectedKey]}/>
        </div> : null}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD7HpL4M6oNMhtHBhEIlAnJp-BAAvWsSTA"
})(MapPage);
