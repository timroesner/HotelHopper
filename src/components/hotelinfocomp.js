import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
import mgm from '../assets/mgmsm.jpg';
import StarRatings from 'react-star-ratings';
import api from '../helper/endpoints';
import { DateRangePicker, SingleDatePicker } from 'react-dates';


class Hotelinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: "",
            hotelName: "MGM Grand Hotel & Casino",
            hotelRating: null,
            hotelAddress: "3799 Las Vegas Blvd S, Las Vegas, NV",
            hotelStreet: "",
            hotelState: "",
            hotelCity: "",
            hotelZip: "",
            hotelCountry: "",
            
            hotelAmenities: [{
                amenityId: 0,
                amenity: {
                    title: '',
                    imageURl: ""
                }
            }],

            rooms: [
                {
                    title: "",
                    description: "",
                    persons: 0,
                    beds: 0,
                    avalable: 0
            }
            ],

            focusedDatePicker: null,
            startDate: null,
            endDate: null,
            startFocus: null,
            endFocus: null,

            rating: 4.5,
        }

    }
    // changeRating(newRating, name) {
    //     this.setState({
    //         rating: newRating
    //     });
    // }
    check(startDate, endDate) {
        console.log(startDate);
        console.log(endDate);
        this.setState(startDate, endDate);
    }
    render() {
        return (
            <div className="HotelInfo">
                <div className="Top" id="bigtopcomponent">
                    <img src={mgm} alt="HotelMGM" className="rounded m-1 w:2/3 h:1/2" />
                    <div className="Hoteldetails">
                        <div>
                            <h1 className="hotelName text-2xl font-bold ">MGM Grand Hotel & Casino</h1>
                            <div>
                                <h2>Rating from state: </h2>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="1637aa"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                            <p className="">This is hotel average point</p>
                            <p className="">This is hotel address</p>
                        </div>
                        <div className="flex hotelAmenities mt-4 ">
                            <h3>Popular Amenities</h3>
                            <div className="flex flex-wrap">

                            </div>
                        </div>
                    </div>
                </div>
                {/* This is date picker and guest pick */}
                <div className="flex w-full m-2 rounded">
                    <div className="flex-1 m-1  ">
                        <SingleDatePicker
                            className=" flex-1 m-1 bg-soft-blue w-full md:w-full rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold"
                            placeholder="Check in"
                            id="start_date"
                            required={true}
                            readOnly={true}
                            orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                            date={this.state.date}
                            onDateChange={date => this.setState({ date })}
                            focused={this.state.startFocus}
                            onFocusChange={({ focused: startFocus }) => this.setState({ startFocus })}
                        />
                    </div>
                    <div className="flex-1 m-1  ">
                        <SingleDatePicker
                            className=" flex-1 m-1 bg-soft-blue w-full md:w-full rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold"
                            placeholder="Check Out"
                            date={this.state.endDate}
                            onDateChange={endDate => this.setState({ endDate })}
                            id="end_date" // PropTypes.string.isRequired,
                            required={true}
                            readOnly={true}
                            orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                            focused={this.state.endFocus}
                            onFocusChange={({ focused: endFocus }) => this.setState({ endFocus })}
                        />
                    </div>
                    <div className="flex-1 m-1">
                        <SingleDatePicker
                            className=" flex-1 m-1 bg-soft-blue w-full md:w-full rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold"
                            placeholder="Check Out"
                            date={this.state.endDate}
                            onDateChange={endDate => this.setState({ endDate })}
                            id="end_date" // PropTypes.string.isRequired,
                            required={true}
                            readOnly={true}
                            orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                            focused={this.state.endFocus}
                            onFocusChange={({ focused: endFocus }) => this.setState({ endFocus })}
                        />
                    </div>
                    <div className="flex-1 m-1">
                        <button className="bg-soft-blue w-full md:w-full rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold">Change Search</button>
                    </div>




                </div>


                <div>
                    <p>This is Availability</p>
                </div>
            </div>
        )
    }
}

export default withRouter(Hotelinfo);