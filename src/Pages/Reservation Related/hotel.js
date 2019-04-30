import React, { Component } from 'react';
import '../../index.css';
import { withRouter } from 'react-router-dom';
import mgm from '../../assets/MGM.jpg';
import wifiicon from '../../assets/wifi-icon@2x.png';
import queryString from 'query-string';
import StarRating from 'react-star-ratings';
import api from '../../helper/endpoints';
import { DateRangePicker } from 'react-dates';
import moment from "moment";


class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hotel: {
            imageURL: '',
            hotelAmenities: [],
            rooms: []
        },
        focusedDatePicker: null,
        startDate: null,
        endDate: null,
        rooms: []
    }
  }

  componentWillMount() {
    this.getParams()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getParams = () => {
    const values =  queryString.parse(this.props.location.search);
    this.setState({
      startDate: moment(values.startDate),
      endDate: moment(values.endDate)
    }, () => this.getHotelInfo())
  }
  
  getHotelInfo = () =>{
      let id = this.props.match.params.id;
      fetch(api+"/hotels/"+id+"?startDate=" + this.state.startDate.format("YYYY-MM-DD") + "&endDate="+this.state.endDate.format("YYYY-MM-DD"))
      .then( results => {
        return results.json();
      }).then(hotel => {
        this.setState({
            hotel: hotel['data']
          })
      });
  };

  handleChange = (event) => {
    this.setState({
      rooms: {[event.target.id]: event.target.value}
    });
  }

  getTotalPrice = () => {
    const nights = moment(this.state.endDate).diff(this.state.startDate, 'days')
    var nightlyPrice = 0.0
    Object.keys(this.state.rooms).forEach(roomId => {
      let room = this.state.hotel.rooms.find(item => item.roomTypeId === parseInt(roomId))
      if(room !== undefined) {
        nightlyPrice += this.state.rooms[roomId]*room.price
      }
    })
    return nightlyPrice*nights
  }
  
  renderRooms() {
      let roomList = [];
      this.state.hotel.rooms.forEach( room => {
        roomList.push(
          <div className="relative flex items-start flex-col md:flex-row border-b py-4" key={room.roomTypeId}>
            {/* TODO: Replace with image from backend */}
            <img className="w-full md:w-1/3 h-auto mr-2 rounded" alt="Room" src={mgm} />
            <div className="h-24 md:h-auto mt-4 md:mt-0 w-full md:w-2/3">
              <p className="text-lg md:text-2xl font-bold absolute pin-l md:ml-7/20">{room.title}</p>
              <div className="md:text-xl text-grey-darker absolute pb-4 pin-b pin-l md:ml-7/20">
                <p className="mb-2">{room.description}</p>
                <p>Sleeps {room.persons}</p>
              </div>
              <input className="absolute p-t pin-r appearance-none bg-white font-bold border rounded h-8 w-16 py-2 px-3 text-grey-darker text-right focus:outline-none focus:shadow-outline"
                id={room.roomTypeId}
                placeholder="0"
                type="number"
                pattern="\d*"
                value={this.state.rooms[room.roomTypeId]} 
                onChange={this.handleChange}
              />
              <p className="absolute mb-4 pin-b pin-r md:text-xl text-grey-darkest font-bold text-right leading-normal">
                ${room.price}/night <br/>or {room.price*2} Points
              </p>
            </div>
          </div>
        )
      })
      return roomList;
  }

  reserveRoom() {
    // Get rooms
    var roomsString = ""
    Object.keys(this.state.rooms).forEach(roomId => {
      let numOfRooms = this.state.rooms[roomId]
      if(numOfRooms > 0) {
        roomsString += roomId+":"+numOfRooms+","
      }
    })

    if(roomsString === "") {
      alert("Select at least one room")
    } else {
      this.props.history.push({
        pathname: "/checkout",
        search: `startDate=${this.state.startDate.format("YYYY-MM-DD")}&endDate=${this.state.endDate.format("YYYY-MM-DD")}&hotelId=${this.props.match.params.id}&rooms=${roomsString}`
      })
    }
  }

  changeSearch() {
    this.props.history.push({
      pathname: `/hotel/${this.props.match.params.id}`,
      search: `?startDate=${this.state.startDate.format("YYYY-MM-DD")}&endDate=${this.state.endDate.format("YYYY-MM-DD")}`
    })
  }

  renderAmenities= () =>{
      let hotelamenities =[];
      this.state.hotel.hotelAmenities.forEach( amenity => {
        hotelamenities.push(
            <div className='flex items-center my-2' key={amenity.amenityId}>
              {/* TODO: include Dynamic images later */}
              <img alt='amenity' src={wifiicon} className="h-auto w-8" />
              <p className="ml-2 text-dark-blue font-bold w-28 md:w-32 truncate">{amenity.amenity.title}</p>                   
            </div>
        )
      })
      return hotelamenities;
  }
              
  render() {
    return (
        <div>
            <div className='flex justify-between flex-col md:flex-row w-full-w/o-margins max-w-xl mx-auto'>
                <img className= 'w-full h-auto mt-6 rounded' alt="hotelImage" src={this.state.hotel.imageUrl} />
                <div className= 'mb-4 md:ml-6'>
                    <div className="mb-2 flex-col mt-6 mb-2">
                        <p className="font-bold text-lg md:text-3xl my-2">{this.state.hotel.title}</p>
                        <StarRating
                          rating={this.state.hotel.stars}
                          numberOfStars={this.state.hotel.stars}
                          starRatedColor="#597aee"
                          starSpacing="3px"
                          starDimension="25px"
                          name='rating'
                        />
                        <p className="mt-2 text-sm md:text-lg">
                          {`${this.state.hotel.street}, ${this.state.hotel.city}, ${this.state.hotel.state}`}
                        </p>
                        <p className="mt-2 md:text-lg font-medium">
                          {this.state.hotel.rating+" / 10 User rating"}
                        </p>
                    </div>
                    <div className='mt-8'>
                      <h3>Hotel Amenities</h3>
                      <div className="mt-2 flex flex-wrap content-start" >
                        {this.renderAmenities()}   
                      </div>   
                    </div>
                </div>
            </div>
            {/* date range */}
            <div className='w-full-w/o-margins max-w-xl mx-auto flex flex-col md:flex-row md:mt-8'>
              <DateRangePicker
                  startDate={this.state.startDate}
                  startDatePlaceholderText="Check in"
                  startDateId="start_date"
                  endDate={this.state.endDate}
                  endDatePlaceholderText="Check out"
                  endDateId="end_date"
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                  focusedInput={this.state.focusedDatePicker}
                  onFocusChange={focusedDatePicker => this.setState({ focusedDatePicker })}
              />
              <button
                  className="bg-soft-blue w-full md:w-2/5 mt-2 md:mt-0 md:ml-4 rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold"
                  onClick={() => this.changeSearch()}
              >
                Change search
              </button>
            </div>
            {/* ROOMS */}
            <div className ="mt-8 md:mb-8 w-full-w/o-margins max-w-xl mx-auto flex items-start flex-col md:flex-row">
                <div className="md:mr-8 md:w-3/4">
                    <p className='text-dark-blue text-xl md:text-2xl font-bold'>Availability</p>
                    {this.renderRooms()}
                </div>
                <div className="w-full md:w-1/4 h-auto md:sticky" style={{top: "4rem"}}>
                  <p className="my-4 text-xl font-semibold">
                    {"Subtotal: "}
                    <span className="float-right">
                      {"$"+this.getTotalPrice().toFixed(2)}
                    </span>
                  </p>
                  <button
                      className="bg-soft-blue w-full rounded text-white mb-8 p-2 h-12 md:h-16 font-sans text-xl font-bold"
                      onClick={() => this.reserveRoom()}
                  >
                    I'll reserve
                  </button>
                </div>
            </div>
        </div>
    )
  }
}

export default withRouter(Hotel);