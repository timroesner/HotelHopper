import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
import api from '../helper/endpoints';
import { SingleDatePicker } from 'react-dates';
import Geosuggest from 'react-geosuggest';
import 'react-dates/lib/css/_datepicker.css';
import queryString from 'query-string'
import moment from 'moment';
const google = window.google;
//import Geosuggest from 'react-geosuggest';

class SearchComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedDatePicker: null,
            startDate: null,
            endDate: null,
            startFocus: null,
            endFocus: null,
            locationPlaceholder: 'Choose Location',
            people: 2,
            rooms: 1,
            showPeople: false,
            lat: null,
            long:null,
            location:null,
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
        
      }
      handleClick = (e) => {
          console.log(this.refs);
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
          this.setState({people: newValue})
        } 
        if(newValue < 2) {
          this.refs.peopleMinus.className = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed"
        } else {
          this.refs.peopleMinus.className = "w-8 h-8 text-white bg-soft-blue rounded-full"
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
        for(let item in values){
            if(item === 'startDate' || item === 'endDate'){
                let date = moment(values[item],'L');
                this.state[item] = date;
            }
            else if(item ==='people' || item ==='rooms'){
                let count = parseInt(values[item], 10);
                this.state[item] = count;
            }
            else{
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

        if(values["lat"] && values["long"]){
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(values["lat"],values["long"]);
        geocoder.geocode({
            'latLng': latlng
          }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                this.setState({locationPlaceholder:results[1]["formatted_address"]});
              } else {
                alert('No results found');
              }
            } else {
              alert('Geocoder failed due to: ' + status);
            }
          }.bind(this));
     }
    }
     search() {
         const location = this.state.location;
         const lat = this.state.lat;
         const long = this.state.long;
        if(location && this.state.startDate && this.state.endDate && this.state.people && this.state.rooms) {
            this.props.history.push(`/search?lat=${location.lat}&long=${location.lng}&startDate=${this.state.startDate.format("L")}&endDate=${this.state.endDate.format("L")}&people=${this.state.people}&rooms=${this.state.rooms}`);
        } 
        else if((lat && long && this.state.startDate && this.state.endDate && this.state.people && this.state.rooms)){
            this.props.history.push(`/search?lat=${lat}&long=${long}&startDate=${this.state.startDate.format("L")}&endDate=${this.state.endDate.format("L")}&people=${this.state.people}&rooms=${this.state.rooms}`);
        }
        else {
          alert("Please fill all fields")
        }
      }
      assertButtons(){
        if(this.state.people < 2) {
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
        console.log(this.state);
        return(
            <div class="flex">
            <div class="mt-4 ml-4 h-full w-1/4">
            <div class="align-center container-sm rounded pt-4 pr-4 pl-4 pb-4 mb-4 border bg-white border-soft-blue">

             <Geosuggest
              className="w-full h-full md:w-full h-10 md:h-16 mb-2 md:mr-4 md:text-xl text-grey-darker"
              placeholder={this.state.locationPlaceholder}
              inputClassName="appearance-none bg-white border border-soft-blue font-bold rounded w-full h-10 md:h-16 py-2 px-3 text-grey-darker"
              suggestsClassName="absolute z-10 text-grey-darker md:text-xl bg-white list-reset max-h-8 max-w-8"
              suggestItemClassName="p-2 hover:bg-grey-light cursor-pointer border-b-2"
              onSuggestSelect={(txtField) => this.selectedLocation(txtField)}
              types={["(cities)"]}
             />

            <div className="w-full md:w-full mb-4 mt-2 ">
            <SingleDatePicker
                  placeholder="Check in"
                  
                  id="start_date"
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  date={this.state.startDate} 
                  onDateChange={date => this.setState({ date })} 
                  focused={this.state.startFocus}
                  onFocusChange={({focused:startFocus}) => this.setState({ startFocus })}
                />
                </div>
                <div className="w-full md:w-full mt-2 mb-4">
                <SingleDatePicker class="h-16"
                    placeholder="Check Out"
                    date={this.state.endDate} 
                    onDateChange={endDate => this.setState({ endDate })} 
                    id="end_date" // PropTypes.string.isRequired,
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  focused={this.state.endFocus}
                  onFocusChange={({focused:endFocus}) => this.setState({ endFocus })}
                />
                </div>
                <div ref="peopleDropdown" className="w-full border border-soft-blue mb-2 md:mr-4 rounded">
              <input className="appearance-none cursor-pointer bg-white font-bold w-full rounded h-10 md:h-16 py-2 px-3 text-grey-darker md:text-xl" 
             id="location" readOnly={true} onClick={() => this.toggleDropdown()} type="text" value={`${this.state.people} ${this.state.people > 1 ? "people" : "person"} - ${this.state.rooms} ${this.state.rooms > 1 ? "rooms" : "room"}`} placeholder="2 people - 1 room" />
              {this.state.showPeople &&(
                <div className="rounded bg-white mt-px">
                  <div className="flex items-center justify-between flex-wrap p-4 border-t border-soft-blue ">
                    <p className="w-1/5">People</p>
                    <button ref="peopleMinus" className={this.state.peopleSub}  onClick={() => this.changePeopleValue(this.state.people-1)}>-</button>
                    <p className="w-16 md:w-1/5 text-center">{this.state.people}</p>
                    <button className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changePeopleValue(this.state.people+1)}>+</button>
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
                <button className="Rectangle bg-soft-blue h-14 text-lg w-full hover:bg-blue text-white font-bold py-2 px-4 rounded cursor-pointer" type="button" onClick={() => this.search()}>Search</button> 
                </div>
            </div>
            <div class="align-center container-sm rounded pt-4 pr-4 pl-4 pb-4 bg-white ">
                <button className="Rectangle bg-white border border-soft-blue h-14 text-2xl text-soft-blue w-full font-sans font-bold py-2 px-4 rounded cursor-pointer" type="button">View on Map</button> 
            </div>
            <div class="align-center container-sm rounded pt-4 pr-4 pl-4 pb-4 bg-white ">
                <button ref="optionsButton" className="Rectangle bg-white border border-soft-blue h-14 text-2xl text-soft-blue w-full font-sans font-bold py-2 px-4 rounded cursor-pointer" onClick={() => this.toggleOptions()} type="button">Options</button> 
            </div>
            <div ref="optionsMenu">
                {this.state.showOptions &&(
            <div className="w-full border p-4 border-soft-blue mb-2 md:mr-4 rounded" >
            <div class="align-center container-sm font-sans font-bold rounded mb-4  bg-white">
                <span class="text-2xl text-dark-blue mb-4 "> Sort By</span>
                <div class="pl-4">
                    <form>
                        {this.renderSorts()}
                     </form>
                </div>
            </div>
            <div class="align-center container-sm font-sans font-bold rounded bg-white">
                <span class="text-2xl text-dark-blue mb-4 "> Filter By</span>
                <div>
                <span class="text-xl text-dark-blue mb-4 "> Your Budget</span>
                </div>
                <div class="pl-4">
                    <form>
                       {this.renderFilters()}
                     </form>
                </div>
            </div>
        
                    <div class="align-center container-sm font-sans font-bold rounded mb-4 bg-white">
                    <span class="text-2xl text-dark-blue mb-4 "> Amenities</span>
                    <div class="pl-4">
                        <form>
                            {this.renderAmenities()}
                         </form>
                    </div>
                </div>
                </div>)}
                </div>
                </div>
                <div class="mt-4 ml-4 w-3/4 mr-4">
                <div class="align-center container-sm rounded  bg-white overflow-y-scroll h-screen">
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>                <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>
                </div>
                </div>
                

                </div>
        );
      }
}
export default withRouter(SearchComp);