import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
import api from '../helper/endpoints';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import Geosuggest from 'react-geosuggest';
import queryString from 'query-string'
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import InfiniteScroll from 'react-infinite-scroll-component';
const google = window.google;
//import Geosuggest from 'react-geosuggest';

class SearchComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedDatePicker:null,
            startDate: null,
            endDate: null,
            hotels: [],
            error: null,
            locationPlaceholder: 'Choose Location',
            persons: 2,
            rooms: 1,
            page: 1,
            showPeople: false,
            latitude: null,
            longitude:null,
            location:null,
            hasMore: true,
            searched:false,
            showOptions:false,

            sorts : {
                'user-rating':{'name':'User Rating','checked':false},
                'low-first': {'name':'Price: Low to High','checked':false},
                'high-first': {'name':'Price: High to Low','checked':false},
                'distance': {'name':'Distance','checked':false},
                'star-rating': {'name':'Star Rating','checked':false},
        }
        ,
            filters : {
            '0to74':{'name':'Less than $75', 'checked': false},
            '75to124': {'name':'$75 to $124', 'checked':false},
            '125to199': {'name':'$125 to $199', 'checked':false},
            '200to299': {'name':'$200 to $299', 'checked':false},
            '300+': {'name':'Greater than $300', 'checked':false},
        },
        amens : {
            'breakfast': {'name':'Free Breakfast','checked':false},
            'pool':{'name':'Swimming Pool','checked':false},
            'pets':{'name':'Pet Friendly','checked':false},
            'internet': {'name':'High Speed Internet','checked':false},
            'aircon': {'name':'Air Conditioning','checked':false},
        }
          
        }
        this.getWebsite();
        this.assertButtons();
        this.handleClick = this.handleClick.bind(this);
        this.performSearch();
      }
      performSearch =  () => {
            let querystring = `?latitude=${this.state.latitude}&longitude=${this.state.longitude}&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}&persons=${this.state.persons}&rooms=${this.state.rooms}&page=${this.state.page}`
            console.log(querystring);
            fetch(api+"/hotels"+querystring+"&perPage=5").then(function (response) {
                console.log("HI");
                return response.json();
              }).then(function (data) {
                  console.log("HELLO");
                  console.log(data);
                if (data["error"]) {
                  console.log(data["error"]);
                    let message = data["message"]
                    if (typeof(message) !== String && typeof(message) === 'object') {
                    let errorMsg = '';
                    for (var prop in message){
                        errorMsg = message[prop];
                        break;
                    }
                    this.setState({
                        error: errorMsg
                    });
                    } else {
                    this.setState({
                        error: data["message"]
                        });
                    }
                }
                else {
                    console.log("pass");
                    console.log(data);
                    this.setState({ hotels: [...this.state.hotels, ...data["data"] ] });
                    if(Object.keys(data["data"]).length === 0){
                      this.setState({hasMore:false});
                    }
                    else{
                      this.setState({page: this.state.page + 1})
                    }
                }
            this.setState({searched:true});
            }.bind(this))
       // this.setState({page: this.state.page + 1})
        console.log(this.state.hasMore);
          
      }
      goTo(event) {
        const value = "hotel/"+event;
        this.props.history.push(`/${value}`);
      }
      renderHotels(){
        let hotelList = [];
      //  console.log(this.state.hotels);
        if(this.state.hotels && Object.keys(this.state.hotels).length >0){
       //   console.log("INSIDE HOTEL")
            for (var key in this.state.hotels) {
              let hotelQuery = this.state.hotels[key]["hotelId"] + "?startDate=" + moment(this.state.startDate).format("YYYY-MM-DD") + "&endDate=" + moment(this.state.endDate).format("YYYY-MM-DD");
            //  console.log(key);
              
                hotelList.push(
                  <div class="z-50 flex mt-1 w-full overflow-hidden border-b py-3 border-grey-light" value={hotelQuery} onClick={e => this.goTo(hotelQuery)} style={{ cursor: 'pointer' }}>
                  <div className="w-full justify-between flex col-md-6 ">
                    <div class="flex col-md-6">
                    <img class="h-32 w-48 md:h-48 md:w-64 mr-2 rounded "  src={this.state.hotels[key]["imageUrl"]}/>
                    
                    <div class="justify-between flex-col">  
                      <div  className="font-bold align-start text-lg md:text-xl ml-2 mb-2">{this.state.hotels[key]["title"]}</div>
                      <div class=" text-grey font-sans align-start pb:2 md:pb-12 md:pb-24 text-sm md:text-base ml-2 mt-2">{this.state.hotels[key]["city"]}</div>
                      {window.innerWidth < 768 &&(
                    <div class="font-bold align-start mt-4 mb-4 md:pb-24 text-sm md:text-xl ml-2"> 
                      <StarRatings
                        rating={this.state.hotels[key]["stars"]}
                        starRatedColor="#597aee"
                        starSpacing="3px"
                        changeRating={this.changeRating}
                        starDimension="20px"
                        numberOfStars={this.state.hotels[key]["stars"]}
                        name='rating'
                      /></div>        
                    )}
                      <div class=" font-bold align-start md:pb-4 text-sm md:text-xl ml-2">{this.state.hotels[key]["rating"]} / 10 Guest Rating</div>
                    </div>
                    </div>
                    <div class="text-right flex-col md:pt-0 justify-between align-text-bottom ">    
                    {window.innerWidth > 768 ?
                    <div class="font-bold align-start pb-12 md:pb-24 text-sm md:text-xl ml-2"> 
                    
                      <StarRatings
                        rating={this.state.hotels[key]["stars"]}
                        starRatedColor="#597aee"
                        starSpacing="3px"
                        changeRating={this.changeRating}
                        starDimension="30px"
                        numberOfStars={this.state.hotels[key]["stars"]}
                        name='rating'
                      /></div>        
                    : <div class="pb-24"></div>}
                      <div class="font-bold text-right relative pin-b pin-r pt-4 md:pb-4 text-lg md:text-2xl ml-2">{"$"+this.state.hotels[key]["lowestPrice"]}</div>
                      </div>
                      </div>
          
                    
              </div>
                  );
              }
            }
            else{
              console.log("failed the hotel");
              hotelList.push(
              
                  <div class="block font-bold justify-center content-center mt-24 col-md-6">
                  {this.state.hotels && !this.state.error && this.state.searched?
                    <div class="text text-2xl text-red text-center mb-4 ">No Search Results found for this area.</div>
                :
                <div class="text text-2xl text-red text-center mb-4 ">{this.state.error}</div>
                }
                 </div>
              );
            
           
            
              
            }
            console.log(hotelList);
        return hotelList;
      }
      handleClick = (e) => {
      //    console.log(this.refs);
        if(!this.refs.optionsMenu.contains(e.target) && !this.refs.optionsButton.contains(e.target)) {
           this.setState({showOptions: false})
        }
      }
      componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
      }
     
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
      }
      check(startDate,endDate){
          console.log(startDate);
          console.log(endDate);
          this.setState(startDate,endDate);
      }
        toggleDropdown() {
            this.setState({ showPeople: !this.state.showPeople });
          }
          toggleOptions() {
            this.setState({ showOptions: !this.state.showOptions });
          }
      changePeopleValue(newValue) {
        if(newValue > 0) {
          this.setState({persons: newValue})
        } 
        if(newValue < 2) {
          this.refs.peopleMinus.className = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed"
        } else {
          this.refs.peopleMinus.className = "w-8 h-8 text-white bg-soft-blue rounded-full"
        }
     }
    changePageValue(newValue){
      console.log("WTF");
      if(newValue > 0) {
        console.log("Page VALUE" + newValue);
        this.setState({page: newValue});
        console.log(this.state.page);
        const location = this.state.location;
        const lat = this.state.latitude;
        const long = this.state.longitude;
        if(location && this.state.startDate && this.state.endDate && this.state.persons && this.state.rooms) {
          this.props.history.push(`/search?latitude=${location.lat}&longitude=${location.lng}&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}&persons=${this.state.persons}&rooms=${this.state.rooms}&page=${newValue}`);
          window.location.reload();
          } 
        else if((lat && long && this.state.startDate && this.state.endDate && this.state.persons && this.state.rooms)){
          this.props.history.push(`/search?latitude=${lat}&longitude=${long}&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}&persons=${this.state.persons}&rooms=${this.state.rooms}&page=${newValue}`);
         window.location.reload();
        }
      }
   }
    
     changeRoomValue(newValue) {
        if(newValue > 0) {
          this.setState({rooms: newValue})
        }
        if(newValue < 2) {
          this.refs.roomsMinus.className = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed"
        } else {
          this.refs.roomsMinus.className = "w-8 h-8 text-white bg-soft-blue rounded-full"
        }
     }
     selectedLocation(element) {
        
        if(element) {
            console.log(element);
            console.log(element.location);
         this.setState({location: element.location})
        } else {
         this.setState({location: null})
        }
      }
    changeRadio = (e) => {
        let radios = this.state[e.target.name]; 
        for(var item in radios){
            radios[item]["checked"] = false;
        }
        console.log(radios);
        radios[e.target.value]["checked"] = true;
        this.setState({[e.target.name]:radios});
        //this.state[e.target.name][e.target.value]["checked"] = true;
        
    }
      renderSorts = () => {
        let sortOptions = []
            for (var key in this.state.sorts) {
                sortOptions.push(
                    <div>
                    <label> 
                        <input class="mr-4 mt-1 mb-1 " type="radio" checked={this.state.sorts[key]["checked"]} onClick={e => this.changeRadio(e)}name="sorts" value={key}/>
                        <span class="text-dark-blue opacity-75">{this.state.sorts[key]["name"]}</span>
                    </label>
                </div>
                  )
              }
        return sortOptions;
     }

     renderFilters = () => {
        let filterOptions = []
            for (var key in this.state.filters) {
                filterOptions.push(
                    <div>
                    <label> 
                        <input class="mr-4 mt-1 mb-1" type="radio" checked={this.state.filters[key]["checked"]} onClick={e => this.changeRadio(e)} name="filters" value={key}/>
                        <span class="text-dark-blue opacity-75">{this.state.filters[key]["name"]}</span>
                    </label>
                </div>
                  )
              }
          
        return filterOptions;
    }
     renderAmenities = () => {
        let amenOptions = []
            for (var key in this.state.amens) {
                amenOptions.push(
                    <div>
                    <label> 
                        <input class="mr-4 mt-1 mb-1" type="checkbox" name="amens" value={key}/>
                        <span class="text-dark-blue opacity-75">{this.state.amens[key]["name"]}</span>
                    </label>
                </div>
                  )
              }
          
        return amenOptions;
     }
     getWebsite(){
        const values = queryString.parse(this.props.location.search);
        console.log("this is value");
        console.log(values);
        for(let item in values){
            if(item === 'startDate' || item === 'endDate'){
                let date = moment(values[item],'YYYY-MM-DD')
                this.state[item] = date;
            }
            else if(item ==='persons' || item ==='rooms' || item==='page'){
                let count = parseInt(values[item], 10);
                this.state[item] = count;
            }
            else{
              console.log(item);
            this.state[item] = values[item];
            }
        }
        if(values["sortBy"]){
            this.state.sorts[values["sortBy"]]['checked'] = true;
        }
        else{
            this.state.sorts['user-rating']['checked'] = true;
        }
        
        if(values["filterBy"]){
            this.state.filters[values["filterBy"]]['checked'] = true;
        }
        else{
            this.state.filters['0to74']['checked'] = true;
        }

        if(values["latitude"] && values["longitude"]){
        
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(values["latitude"],values["longitude"]);
        geocoder.geocode({
            'latLng': latlng
          }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              console.log(results);
              if (results[1]) {
                for (var ac = 0; ac < results[1].address_components.length; ac++) {
    
                  var component = results[1].address_components[ac];
                   
                  if(component.types.includes('sublocality') || component.types.includes('locality')) {
                    this.setState({locationPlaceholder:component.long_name});
                    break;
                  }
              }
            } else {
                alert('No results found');
              }
            } else {
              alert('Geocoder failed due to: ' + status);
            }
          }.bind(this));
     }
    // console.log(this.state);
    }
     search() {
         const location = this.state.location;
         const lat = this.state.latitude;
         const long = this.state.longitude;
        if(location && this.state.startDate && this.state.endDate && this.state.persons && this.state.rooms) {
            this.props.history.push(`/search?latitude=${location.lat}&longitude=${location.lng}&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}&persons=${this.state.persons}&rooms=${this.state.rooms}&page=1`);
            window.location.reload();
            } 
        else if((lat && long && this.state.startDate && this.state.endDate && this.state.persons && this.state.rooms)){
            this.props.history.push(`/search?latitude=${lat}&longitude=${long}&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}&persons=${this.state.persons}&rooms=${this.state.rooms}&page=1`);
            window.location.reload();
          }
        else {
          alert("Please fill all fields")
        }
      }
      assertButtons(){
        if(this.state.persons < 2) {
            this.state.peopleSub = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed";
          } else {
            this.state.peopleSub = "w-8 h-8 text-white bg-soft-blue rounded-full";
          }
          if(this.state.rooms < 2) {
            this.state.roomSub = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed";
          } else {
            this.state.roomSub = "w-8 h-8 text-white bg-soft-blue rounded-full";
          }
      }
      render(){
       // console.log(this.state);
        return(
            <div class="md:flex p-4 md:p-0">
            <div class="md:mt-8 md:ml-8 h-full md:w-1/4 overflow-hidden md:w-1/4 md:block">
            <div class="align-center container-sm rounded pt-4 pr-4 pl-4 pb-4 mb-4 border bg-white border-soft-blue">

             <Geosuggest
              className="w-full h-full md:w-full h-10 md:h-16 mb-4 md:mr-4 md:text-xl text-grey-darker"
              initialValue={this.state.locationPlaceholder}
              inputClassName="appearance-none bg-white border border-soft-blue font-bold rounded w-full h-10 md:h-16 py-2 px-3 text-grey-darker"
              suggestsClassName="absolute z-10 text-grey-darker md:text-xl bg-white list-reset max-h-8 max-w-8"
              suggestItemClassName="p-2 hover:bg-grey-light cursor-pointer border-b-2"
              onSuggestSelect={(txtField) => this.selectedLocation(txtField)}
              types={["(cities)"]}
             />
             <div className="w-full h-10 md:h-16 mb-4 md:mr-4 md:text-xl">
             <div>
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
              </div>
            
                <div ref="peopleDropdown" className="w-full border border-soft-blue mb-4 md:mr-4 rounded">
              <input className="appearance-none cursor-pointer bg-white font-bold w-full rounded h-10 md:h-16 py-2 px-3 text-grey-darker md:text-xl" 
             id="location" readOnly={true} onClick={() => this.toggleDropdown()} type="text" value={`${this.state.persons} ${this.state.persons > 1 ? "people" : "person"} - ${this.state.rooms} ${this.state.rooms > 1 ? "rooms" : "room"}`} placeholder="2 people - 1 room" />
              {this.state.showPeople &&(
                <div className="rounded bg-white mt-px">
                  <div className="flex items-center justify-between flex-wrap p-4 border-t border-soft-blue ">
                    <p className="w-1/5">People</p>
                    <button ref="peopleMinus" className={this.state.peopleSub}  onClick={() => this.changePeopleValue(this.state.persons-1)}>-</button>
                    <p className="w-16 md:w-1/5 text-center">{this.state.persons}</p>
                    <button className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changePeopleValue(this.state.persons+1)}>+</button>
                  </div>
                  <div className="flex items-center justify-between flex-wrap p-4 border-t border-soft-blue ">
                    <p className="w-1/5">Rooms</p>
                    <button ref="roomsMinus"  className={this.state.roomSub} onClick={() => this.changeRoomValue(this.state.rooms-1)}>-</button>
                    <p className="w-16 md:w-1/5 text-center">{this.state.rooms}</p>
                    <button className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changeRoomValue(this.state.rooms+1)}>+</button>
                  </div>
                </div>)
              }
              </div>
                <div className="flex items-center justify-center mt-2">
                <button className="cursor-pointer bg-soft-blue w-full md:w-full rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold"  type="button" onClick={() => this.search()}>Search</button> 
                </div>
            </div>
            <div class="align-center container-sm rounded md:pt-4 pr-4 pl-4 pb-4 bg-white ">
                <button className="Rectangle bg-white border border-soft-blue h-10 md:h-14 md:text-2xl text-lg text-soft-blue w-full font-sans font-bold py-2 px-4 rounded cursor-pointer" type="button">View on Map</button> 
            </div>
            <div class="align-center container-sm rounded md:pt-4 pr-4 pl-4 pb-4 bg-white ">
                <button ref="optionsButton" className="Rectangle bg-white border border-soft-blue h-10 md:h-14 md:text-2xl text-lg text-soft-blue w-full font-sans font-bold py-2 px-4 rounded cursor-pointer" onClick={() => this.toggleOptions()} type="button">Options</button> 
            </div>
            <div ref="optionsMenu">
                {this.state.showOptions &&(
            <div className="w-full border p-4 border-soft-blue mb-2 md:mr-4 rounded" >
            <div class="align-center container-sm font-sans font-bold rounded mb-4  bg-white">
                <span class="md:text-2xl text-lg text-dark-blue mb-4 "> Sort By</span>
                <div class="pl-4">
                    <form>
                        {this.renderSorts()}
                     </form>
                </div>
            </div>
            <div class="align-center container-sm font-sans font-bold mb-4 rounded bg-white">
                <span class="md:text-2xl text-lg text-dark-blue mb-4 "> Filter By</span>
                <div>
                <span class="md:text-xl text-base text-dark-blue mb-4 "> Your Budget</span>
                </div>
                <div class="pl-4">
                    <form>
                       {this.renderFilters()}
                     </form>
                </div>
            </div>
        
                    <div class="align-center container-sm font-sans font-bold rounded mb-4 bg-white">
                    <span class="md:text-2xl text-lg text-dark-blue mb-4 "> Amenities</span>
                    <div class="pl-4">
                        <form>
                            {this.renderAmenities()}
                         </form>
                    </div>
                </div>
                </div>)}
                </div>
                </div>
                <div class="md:ml-8 mt-4 md:w-3/4 md:mr-8 w-full">
                <div class="align-center container-sm rounded bg-white overflow-y-scroll h-screen" id="scrolling" >
               
                    <div>
                        <InfiniteScroll
                            pageStart={0}
                            dataLength={Object.keys(this.state.hotels).length}
                            next={this.performSearch}
                            hasMore={this.state.hasMore}
                            scrollableTarget= {"scrolling"}
                            scrollThreshold = {1.0}
                        >
                            {this.renderHotels()}
                        </InfiniteScroll>
                    </div>
                
                {/* {this.renderHotels()} */}
                </div>
                </div>
                

                </div>
        );
      }
}
export default withRouter(SearchComp);

