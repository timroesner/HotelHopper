import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Dialog from "../../assets/dialog.png";

const mapStyles = {
  width: "100%",
  height: "90%"
};

const infoDivStyles = {
  position: "absolute",
  backgroundColor: "white",
  bottom: -40
}

const textLeft = {
  textAlign: "left",
  display: "inline-block"
}

const textRight = {
  float: "right",
  display: "inline-block"
}

const textLeftWPadding = {
  textAlign: "left",
  paddingTop: 6,
  display: "inline-block"
}

const lat = 37.3440232; // this will be passed in
const lng = -121.8738311;

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      hotels: [],
      selectedKey: -1,
      showingInfoWindow: false
    };
    this.fetchHotels();
  }

  fetchHotels = () => {
    fetch("https://staging-api.hotelhopper.cf/hotels?" +
      "latitude=37.3440232&" +
      "longitude=-121.8738311&" +
      "startDate=2019-05-01&" +
      "endDate=2019-05-10&" +
      "persons=2"
    )
      .then(results => {
        return results.json();
      })
      .then(resultJson => {
        this.setState({ hotels: resultJson['data'] })
      })
  };

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

  stars = (star) => {
    let stars = []
    for (let i = 0; i < star; i++) {
      stars.push(<img key={i} src={require('../../assets/star.png')} />);
    }
    return stars;
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: lat,
            lng: lng
          }}
        >
          {this.markers()}
        </Map>
        {this.state.selectedKey > -1 ?
          <div style={infoDivStyles}>
            <img style={{ marginBottom: "20px" }}
              src={this.state.hotels[this.state.selectedKey].imageUrl} />
            <div style={{ marginBottom: "5px" }}>
              <h3 style={textLeft}>{this.state.hotels[this.state.selectedKey].title}</h3>
              <h3 style={textRight}>{"$" + this.state.hotels[this.state.selectedKey].lowestPrice}</h3>
            </div>
            <div>
              <h3 style={textLeftWPadding}>{this.state.hotels[this.state.selectedKey].rating + "/10"}</h3>
              <div style={textRight}>{this.stars(this.state.hotels[this.state.selectedKey].stars)}</div>
            </div>
          </div> : null}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD7HpL4M6oNMhtHBhEIlAnJp-BAAvWsSTA"
})(MapContainer);
