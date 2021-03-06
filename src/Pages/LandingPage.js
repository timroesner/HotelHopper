import React, { Component } from 'react';
import hero from '../assets/hero@2x.png';
import api from '../helper/endpoints';
import { DateRangePicker } from 'react-dates';
import Geosuggest from 'react-geosuggest';
import moment from 'moment';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      popularDestinations: [],
      focusedDatePicker: null,
      showPeople: false,
      location: null,
      locDescription: null,
      startDate: null,
      endDate: null,
      people: 2,
      rooms: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.popularDestinations();
  }

  popularDestinations = () => {
    fetch(api + "/popularDestinations")
      .then(results => {
        return results.json();
      })
      .then(destinationsJson => {
        this.setState({ popularDestinations: destinationsJson["data"] });
      });
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
    window.scrollTo(0, 0)
  }

  handleClick = e => {
    if (!this.refs.peopleDropdown.contains(e.target)) {
      this.setState({ showPeople: false });
    }
  };

  renderPopularDestinations = () => {
    let destinations = [];
    this.state.popularDestinations.forEach(city => {
      destinations.push(
      <div key={city.city} className="w-full md:w-1/4 p-2 cursor-pointer" onClick={() => this.clickPopularDestinations(city)}>
        <img src={city.url} alt={city.city} className="light-filter rounded"/>
        <p className="absolute font-sans text-white text-3xl font-bold ml-4 mb-4 -mt-12">{city.city}</p>
      </div>
      )
    })
    return destinations
 }

 clickPopularDestinations(city) {
  this.props.history.push(`/search?latitude=${city.lat}&longitude=${city.lng}&location=${city.city}&startDate=${moment().add(1,'days').format("YYYY-MM-DD")}&endDate=${moment().add(3, 'days').format("YYYY-MM-DD")}&persons=${this.state.people}&rooms=${this.state.rooms}`);
 }

 selectedLocation(element) {
   if(element) {
    this.setState({location: element.location, locDescription: element.description})
   } else {
    this.setState({location: null})
   }
 }

  changePeopleValue(newValue) {
    if (newValue > 0) {
      this.setState({ people: newValue });
    }
    if (newValue < 2) {
      this.refs.peopleMinus.className =
        "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed";
    } else {
      this.refs.peopleMinus.className =
        "w-8 h-8 text-white bg-soft-blue rounded-full";
    }
  }

  changeRoomValue(newValue) {
    if (newValue > 0) {
      this.setState({ rooms: newValue });
    }
    if (newValue < 2) {
      this.refs.roomsMinus.className =
        "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed";
    } else {
      this.refs.roomsMinus.className =
        "w-8 h-8 text-white bg-soft-blue rounded-full";
    }
  }

 search() {
   const location = this.state.location
   if(location && this.state.startDate && this.state.endDate && this.state.people && this.state.rooms) {
    this.props.history.push(`/search?latitude=${location.lat}&longitude=${location.lng}&location=${this.state.locDescription}&startDate=${this.state.startDate.format("YYYY-MM-DD")}&endDate=${this.state.endDate.format("YYYY-MM-DD")}&persons=${this.state.people}&rooms=${this.state.rooms}`);
   } else {
     alert("Please fill all fields")
   }
 }

  render() {
    return (
      <div className="App">
        <div className="w-full overflow-hidden">
          <div className="absolute z-10 ml-8 mt-1/10 w-full-w/o-margins">
            <p className="md:text-4xl lg:text-5xl text-lg text-white font-sans font-bold mb-4 md:mb-12">
              Find deals to experience the world
            </p>
            <div className="flex flex-wrap -m-2">
              <Geosuggest
                className="w-full md:w-1/4 mb-2 md:mr-4 md:text-xl border border-soft-blue rounded"
                placeholder="Where are you going"
                inputClassName="appearance-none bg-white font-bold rounded w-full h-10 md:h-16 py-2 px-3 text-grey-darker"
                suggestsClassName="absolute z-10 text-grey-darker md:text-xl bg-white list-reset min-w-full md:min-w-1/4 mt-px rounded"
                suggestItemClassName="p-2 hover:bg-grey-light rounded cursor-pointer"
                onSuggestSelect={txtField => this.selectedLocation(txtField)}
                types={["(cities)"]}
              />
              <div className="w-full md:w-1/4 h-10 md:h-16 mb-2 md:mr-4 md:text-xl">
                <DateRangePicker
                  startDate={this.state.startDate}
                  startDatePlaceholderText="Check in"
                  startDateId="start_date"
                  endDate={this.state.endDate}
                  endDatePlaceholderText="Check out"
                  endDateId="end_date"
                  required={true}
                  readOnly={true}
                  orientation={
                    window.innerWidth > 768 ? "horizontal" : "vertical"
                  }
                  onDatesChange={({ startDate, endDate }) =>
                    this.setState({ startDate, endDate })
                  }
                  focusedInput={this.state.focusedDatePicker}
                  onFocusChange={focusedDatePicker =>
                    this.setState({ focusedDatePicker })
                  }
                />
              </div>
              <div ref="peopleDropdown" className="w-full md:w-1/5 mb-2 md:mr-4">
              <input className="appearance-none bg-white font-bold w-full border border-soft-blue rounded h-10 md:h-16 py-2 px-3 text-grey-darker md:text-xl" 
             id="location" readOnly={true} onClick={() => this.setState({showPeople: true})} type="text" value={`${this.state.people} ${this.state.people > 1 ? "people" : "person"} - ${this.state.rooms} ${this.state.rooms > 1 ? "rooms" : "room"}`} placeholder="2 people - 1 room" />
              {this.state.showPeople &&
                <div className="absolute rounded w-full md:w-1/5 bg-white mt-px">
                  <div className="flex items-center justify-between  flex-wrap p-4">
                    <p className="w-2/5">People</p>
                    <button ref="peopleMinus" className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changePeopleValue(this.state.people-1)}>-</button>
                    <p className="w-16 md:w-1/5 text-center">{this.state.people}</p>
                    <button className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changePeopleValue(this.state.people+1)}>+</button>
                  </div>
                  <div className="flex items-center justify-between flex-wrap p-4">
                    <p className="w-2/5">Rooms</p>
                    <button ref="roomsMinus" className="w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed" onClick={() => this.changeRoomValue(this.state.rooms-1)}>-</button>
                    <p className="w-16 md:w-1/5 text-center">{this.state.rooms}</p>
                    <button className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changeRoomValue(this.state.rooms+1)}>+</button>
                  </div>
                </div>
              }
              </div>
              <button
                className="bg-soft-blue w-full md:w-1/5 rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold"
                onClick={() => this.search()}
              >
                Search
              </button>
            </div>
          </div>
          <img
            src={hero}
            className="min-h-72 min-w-160 dark-filter"
            alt="hero"
          />
        </div>
        <div className="ml-8 mr-8 mt-4">
          <p className="text-2xl text-dark-blue font-sans font-bold mb-2">
            Popular Destinations
          </p>
          <div className="flex flex-wrap -m-2">
            {this.renderPopularDestinations()}
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
