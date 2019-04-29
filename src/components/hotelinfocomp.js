import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
import mgm from '../assets/mgmsm.jpg';
import moment from 'moment';
import geoicon from '../assets/Geoicon.png';
import wifiicon from '../assets/wifi-icon.png';
import Bar from '../assets/fill-254.png';
import queryString from 'query-string';
import StarRatings from 'react-star-ratings';
import api from '../helper/endpoints';
import { DateRangePicker } from 'react-dates';


class Hotelinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel: {
                imageURL: '',
                hotelAmenities: [
               
                ]
            },
            focusedDatePicker: null,
            startDate: null,
            endDate: null,
            rooms: [{
                title: '',
                description: '',
                persons: 0,
                beds: 0,
                available: 0
            }]
          
        }
        this.getHotelAmenities();
    }
    getParam= ()=>{
       
    }
   
    // //////
    
    getHotelAmenities= () =>{
        let id = this.props.match.params.id;
        console.log(this.props.location.search);
        const values =  queryString.parse(this.props.location.search);
        console.log(values);
     ///  const values = queryString.parse(this.props.location.search); // keys: startDate and endDate
        fetch(api+"/hotels/"+id+"?startDate=" + values.startDate + "&endDate="+values.endDate).then(
            results => {
              return results.json();
            }).then(hotel => {
                console.log(hotel['data']);
            
              this.setState({
                  hotel: hotel['data']
                })
              //console.log(this.state.hotels['hotelId']); //HOW TO REFERRENCE THE DATA


            });
    };
    ///////
    
    renderRooms() {
        let roomList = [];
        //  console.log(this.state.hotels);
        if (this.state.hotel.rooms && Object.keys(this.state.hotel.rooms).length > 0) {
              console.log("INSIDE HOTEL");
            this.state.hotel.rooms.forEach( room => {
                roomList.push(
                    <div class="z-50 flex mt-1 w-full overflow-hidden border-b py-3 border-grey-light" style={{ cursor: 'pointer' }}>
                        <div className="w-full justify-between flex col-md-6 ">
                            <div class="flex col-md-6">
                                <img class="h-32 w-48 md:h-48 md:w-64 mr-2 rounded " src={mgm} />
                                <div class="justify-between flex-col">
                                    <div className="font-bold align-start text-lg md:text-xl ml-2 mb-2"><h4>{room.title}</h4></div>
                                    <div className=' pin-b pin-l ml-2'>
                                    <p>{room.description}</p>
                                    <p>{room.persons}</p>
                                    <p>{room.description}</p>
                                    </div>
                                    {/* <div class=" text-grey font-sans align-start pb:2 md:pb-12 md:pb-24 text-sm md:text-base ml-2 mt-2">{this.state.hotels[key]["city"]}</div> */}
                                    {window.innerWidth < 768 && (
                                        <div class="font-bold align-start mt-4 mb-4 md:pb-24 text-sm md:text-xl ml-2">
                                            {/* <StarRatings
                                                rating={this.state.hotels[key]["stars"]}
                                                starRatedColor="#597aee"
                                                starSpacing="3px"
                                                changeRating={this.changeRating}
                                                starDimension="20px"
                                                numberOfStars={this.state.hotels[key]["stars"]}
                                                name='rating'
                                            /> */}
                                      
                                            <p>Hello rooms</p>
                                        </div>
                                    )}
                                    {/* <div class=" font-bold align-start md:pb-4 text-sm md:text-xl ml-2"  style={{position: "absolute", bottom: 0, right: 0}}><p>Room capacity</p></div> */}
                                </div>
                            </div>

                            <div class="text-right flex-col md:pt-0 justify-between align-text-bottom ">
                                {window.innerWidth > 768 ?
                                    <div class="font-bold align-start pb-12 md:pb-24 text-sm md:text-xl ml-2">                                     
                                         <input type='text' style ={{textAlign:"right"}} value={room.available}/>
                                        </div>
                                    : <div class="pb-24"></div>}
                                <div class="text-right relative pin-b pin-r pt-4 md:pb-4 text-lg md:text-xl ml-2">
                                    <strong><p>${room.price}/night or XXXX Points</p></strong>
                                </div>
                            </div>
                        </div>


                    </div>
                )
            }

            ) 
        }
        else {
            console.log("failed the hotel");
            roomList.push(

                <div class="block font-bold justify-center content-center mt-24 col-md-6">
                    {this.state.hotels && !this.state.error && this.state.searched ?
                        <div class="text text-2xl text-red text-center mb-4 ">No Search Results found for this area.</div>
                        :
                        <div class="text text-2xl text-red text-center mb-4 ">{this.state.error}</div>
                    }
                </div>
            );




        }
        console.log(roomList);
        return roomList;
    }
    //Reserve Rooms
    reserveRoom() {
        console.log('room reserved')
    }
    /// Search
    search() {
        if (this.state.startDate && this.state.endDate) {
            this.props.history.push(`/search?startDate=${this.state.startDate.format("YYYY-MM-DD")}&endDate=${this.state.endDate.format("YYYY-MM-DD")}&rooms=${this.state.rooms}`);
        } else {
            alert("Please fill all fields")
        }
    }
    renderAmenities= () =>{
        let hotelamenities =[];
        this.state.hotel.hotelAmenities.forEach( amenity => {
            console.log(amenity);
            hotelamenities.push(
                <div className=' flex mt-1 '>
                   
                        {/* TODO: include Dynamic images later */}
                        <div className='mr-1'>
                        <img alt='hotel amenities' alt='amenities images'src={wifiicon}/>
                        </div>
                        <div>
                        <p>{amenity.amenity.title}</p> 
                        </div>                    
                    
                </div>
           
            )
           
        }) 
        return hotelamenities;         
        
    
    }
               
                

            

        
    
   
    ////////////////////////////////////RENDER
    render() {
    

        return (
            <div>
                <div className='flex mr-32 ml-32'>
                    <div className=' mr-4  flex-3/5 mb-4 '>
            
                        <img className='h-32 w-48 md:h-auto md:w-auto ml-6 mt-6 rounded' alt="hotelImage" src={this.state.hotel.imageUrl} />
                    </div>
                    <div className=' mb-4 ml-6 '>
                        <div className="mb-2 flex-col mt-6 mb-2">
                            <h2 clasName="">{this.state.hotel.title}</h2>
                            <StarRatings
                                rating={this.state.hotel.stars}
                                starRatedColor="#1637aa"
                                starSpacing="3px"
                                starDimension="30px"
                                numberOfStars='5'
                                name='rating'
                            />
                            <div>
                                <strong>{this.state.hotel.rating} /10 Guess ratings</strong>
                                
                            </div>
                            
                            <div>
                               <img src={geoicon} />
                               {this.state.hotel.address}
                            </div>
                        </div>
                        <div className='mt-1'>
                            <h3>Popular Amenities</h3>
                            
                              {this.renderAmenities()}
                               
                          

                        </div>

                    </div>
                </div>
                {/* date range */}
                <div className='flex flex-wrap mr-32 ml-32 mb-4 '>
                    <div className="flex-1 mr-4">
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
                    </div>
                    <button
                        className="bg-soft-blue w-full md:w-1/5 rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold mr-2"
                        onClick={() => this.search()}
                    >
                        Change search
                         </button>
                </div>
                {/* ROOMS */}
                <div className ="flex flex-wrap mr-32 ml-32">
                    <div class="flex-1 align-center container-sm rounded bg-white .pl-4 h-screen" >
                        <h2 className='mb-1'>Availability</h2>
                        <div className='mb-1 mr-6 '>
                            
                                {this.renderRooms()}
                        
                        </div>


                    </div>
                        <button
                            className="bg-soft-blue w-full md:w-1/5 rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold mr-2"
                            onClick={() => this.reserveRoom()}
                        >
                             I'll reserve
                            </button>

                </div>


            </div>


        )
    }
}

export default withRouter(Hotelinfo);