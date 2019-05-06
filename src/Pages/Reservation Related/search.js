import React, { Component } from 'react';
import '../../index.css';
import { withRouter } from 'react-router-dom';
import api from '../../helper/endpoints';
import { DateRangePicker } from 'react-dates';
import Geosuggest from 'react-geosuggest';
import queryString from 'query-string';
import moment from 'moment';
import SearchCell from '../../components/searchCell'
import InfiniteScroll from 'react-infinite-scroll-component';

class Search extends Component {
  constructor(props) {
    super(props);
    this.myDiv = React.createRef();
    this.state = {
      focusedDatePicker: null,
      startDate: null,
      endDate: null,
      hotels: [],
      error: null,
      locationPlaceholder: '',
      persons: 2,
      rooms: 1,
      page: 1,
      showPeople: false,
      latitude: null,
      longitude: null,
      location: null,
      hasMore: true,
      searched: false,
      showOptions: window.innerWidth > 768 ? true : false,

      sorts: {
        'rating': { 'name': 'User Rating', 'checked': true },
        'priceLow': { 'name': 'Price: Low to High', 'checked': false },
        'priceHigh': { 'name': 'Price: High to Low', 'checked': false },
        'distance': { 'name': 'Distance', 'checked': false },
        'stars': { 'name': 'Star Rating', 'checked': false },
      },
      filters: {
        '0to74': { 'name': 'Less than $75', 'max': 74, 'checked': false },
        '75to124': { 'name': '$75 to $124', 'min': 75, 'max': 124, 'checked': false },
        '125to199': { 'name': '$125 to $199', 'min': 125, 'max': 199, 'checked': false },
        '200to299': { 'name': '$200 to $299', 'min': 200, 'max': 299, 'checked': false },
        '300+': { 'name': 'Greater than $300', 'min': 300, 'checked': false },
      },
      amens: {
        '4': { 'name': 'Air Conditioning', 'id': 4, 'checked': false },
        '8': { 'name': 'Business Service', 'id': 8, 'checked': false},
        '7': { 'name': 'Breakfast', 'id': 7, 'checked': false },
        '10': { 'name': 'Full Bar', 'id': 10, 'checked': false },
        '2': { 'name': 'Free Wifi', 'id': 2, 'checked': false },
        '6': { 'name': 'Gym', 'id': 6, 'checked': false },
        '9': { 'name': 'Parking', 'id': 9, 'checked': false },
        '1': { 'name': 'Pool', 'id': 1, 'checked': false },
        '5': { 'name': 'Restaurant', 'id': 5, 'checked': false },
        '11': { 'name': 'Room Service', 'id': 11, 'checked': false },
        '3': { 'name': 'Spa', 'id': 3, 'checked': false },
      }
    }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
    this.assertButtons();
    this.getWebsite();
    this.performSearch();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  getWebsite() {
    const values = queryString.parse(this.props.location.search);

    for (let item in values) {
      if (item === 'startDate' || item === 'endDate') {
        let date = moment(values[item], 'YYYY-MM-DD')
        this.state[item] = date;
      }
      else if (item === 'persons' || item === 'rooms' || item === 'page') {
        let count = parseInt(values[item], 10);
        this.state[item] = count;
      }
      else if (item === 'location') {
        this.state["locationPlaceholder"] = values[item]
      }
      else {
        this.state[item] = values[item];
      }
    }

    // if (values["sortBy"]) {
    //   this.setState({sorts: {...this, [values.sortBy]: {...this, checked: true }}})
    // }

    if (values["requestedAmenities"]) {
      values["requestedAmenities"].split(",").forEach(amenityId => {
        this.setState({amens: {amenityId: {...this, checked: true}}})
      })
    }
  }

  performSearch = () => {
    let querystring = 
    `?latitude=${this.state.latitude}`
    +`&longitude=${this.state.longitude}`
    +`&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}`
    +`&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}`
    +`&persons=${this.state.persons}`
    +`&rooms=${this.state.rooms}`
    +`&page=${this.state.page}`
    + this.buildAmentiesString()
    + "&sortBy=rating"
    + this.buildMinMaxString()
    +`&perPage=10`
    console.log(querystring)

    fetch(api + "/hotels" + querystring).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data["error"]) {
        this.setState({
          error: data["message"]
        });
      }
      else {
        this.setState({ hotels: [...this.state.hotels, ...data["data"]] });
        if (Object.keys(data["data"]).length === 0) {
          this.setState({ hasMore: false });
        }
        else {
          this.setState({ page: this.state.page + 1 })
        }
      }
      this.setState({ searched: true });
    }.bind(this))
  }

  goTo(event) {
    const value = "hotel/" + event;
    this.props.history.push(`/${value}`);
  }

  handleClick = (e) => {
    if (!this.refs.optionsMenu.contains(e.target) && !this.refs.optionsButton.contains(e.target) && window.innerWidth < 768) {
      this.setState({ showOptions: false })
    }
  }

  toggleDropdown() {
    this.setState({ showPeople: !this.state.showPeople });
  }

  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  changePeopleValue(newValue) {
    if (newValue > 0) {
      this.setState({ persons: newValue })
    }
    if (newValue < 2) {
      this.refs.peopleMinus.className = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed"
    } else {
      this.refs.peopleMinus.className = "w-8 h-8 text-white bg-soft-blue rounded-full"
    }
  }

  changePageValue(newValue) {
    if (newValue > 0) {
      this.setState({ page: newValue });
      const location = this.state.location;
      const lat = this.state.latitude;
      const long = this.state.longitude;
      if (location && this.state.startDate && this.state.endDate && this.state.persons && this.state.rooms) {
        this.props.history.push(`/search?latitude=${location.lat}&longitude=${location.lng}&location=${this.state.locationPlaceholder}&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}&persons=${this.state.persons}&rooms=${this.state.rooms}&page=${newValue}`);
        window.location.reload();
      }
      else if ((lat && long && this.state.startDate && this.state.endDate && this.state.persons && this.state.rooms)) {
        this.props.history.push(`/search?latitude=${lat}&longitude=${long}&location=${this.state.locationPlaceholder}&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}&persons=${this.state.persons}&rooms=${this.state.rooms}&page=${newValue}`);
        window.location.reload();
      }
    }
  }

  changeRoomValue(newValue) {
    if (newValue > 0) {
      this.setState({ rooms: newValue })
    }
    if (newValue < 2) {
      this.refs.roomsMinus.className = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed"
    } else {
      this.refs.roomsMinus.className = "w-8 h-8 text-white bg-soft-blue rounded-full"
    }
  }
  selectedLocation(element) {
    if (element) {
      this.setState({ location: element.location, locationPlaceholder: element.description })
    } else {
      this.setState({ location: null })
    }
  }

  changeRadio = (e) => {
    let radios = this.state[e.target.name];
    for (var item in radios) {
      radios[item]["checked"] = false;
    }

    radios[e.target.value]["checked"] = true;
    this.setState({ [e.target.name]: radios }, this.search());
  }

  changeCheckbox = (e) => {
    let radios = this.state[e.target.name];
    radios[e.target.value].checked = !radios[e.target.value].checked;
    this.setState({ [e.target.name]: radios }, this.search());
  }

  renderSorts = () => {
    let sortOptions = []
    for (var key in this.state.sorts) {
      sortOptions.push(
        <div key={key}>
          <label>
            <input className="mr-4 mt-1 mb-1 " type="radio" checked={this.state.sorts[key]["checked"]} onChange={e => this.changeRadio(e)} name="sorts" value={key} />
            <span className="text-dark-blue opacity-75">{this.state.sorts[key]["name"]}</span>
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
        <div key={key}>
          <label>
            <input className="mr-4 mt-1 mb-1" type="radio" checked={this.state.filters[key]["checked"]} onChange={e => this.changeRadio(e)} name="filters" value={key} />
            <span className="text-dark-blue opacity-75">{this.state.filters[key]["name"]}</span>
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
        <div key={key}>
          <label>
            <input className="mr-4 mt-1 mb-1" type="checkbox" name="amens" value={key} checked={this.state.amens[key].checked} onChange={e => this.changeCheckbox(e)} />
            <span className="text-dark-blue opacity-75">{this.state.amens[key]["name"]}</span>
          </label>
        </div>
      )
    }

    return amenOptions;
  }

  buildSortString = () => {
    var string = ""
    Object.keys(this.state.sorts).forEach(sortKey => {
      let sort = this.state.sorts[sortKey]
      if(sort.checked) {
        string += `&sortBy=${sortKey}`
      }
    })
    return string
  }

  buildAmentiesString = () => {
    var idArray = []
    Object.keys(this.state.amens).forEach(amenityKey => {
      let amenity = this.state.amens[amenityKey]
      if(amenity.checked) {
        idArray.push(amenity.id)
      }
    })
    if(idArray.length === 0) {
      return ""
    } else {
      return "&requestedAmenities="+idArray.join(",")
    }
  }

  buildMinMaxString = () => {
    var string = ""
    Object.keys(this.state.filters).forEach(filterKey => {
      let filter = this.state.filters[filterKey]
      if(filter.checked) {
        if(filter.min) { 
          string += `&minPrice=${filter.min}`
        }
        if(filter.max) { 
          string += `&maxPrice=${filter.max}`
        }
      }
    })
    return string
  }

  search() {
    const lat = this.state.latitude;
    const long = this.state.longitude;

    if ((lat && long && this.state.startDate && this.state.endDate && this.state.persons && this.state.rooms)) {
      this.setState({hotels: []})
      this.props.history.push(
        `/search?latitude=${lat}`
        +`&longitude=${long}`
        +`&location=${this.state.locationPlaceholder}`
        +`&startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}`
        +`&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}`
        +`&persons=${this.state.persons}`
        +`&rooms=${this.state.rooms}`
        + this.buildAmentiesString()
        + this.buildMinMaxString()
        + this.buildSortString()
        +`&page=1`
      );
      this.getWebsite()
      this.performSearch()
    }
    else {
      alert("Please fill all fields")
    }
  }

  showMap() {
    this.props.history.push({
      pathname: '/map',
      search: `?startDate=${moment(this.state.startDate).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format("YYYY-MM-DD")}`,
      state: { 
        hotels: this.state.hotels,
        lat: this.state.latitude,
        long: this.state.longitude,
        location: this.state.locationPlaceholder
      }
    })
  }

  assertButtons() {
    if (this.state.persons < 2) {
      this.state.peopleSub = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed";
    } else {
      this.state.peopleSub = "w-8 h-8 text-white bg-soft-blue rounded-full";
    }
    if (this.state.rooms < 2) {
      this.state.roomSub = "w-8 h-8 text-white bg-grey rounded-full cursor-not-allowed";
    } else {
      this.state.roomSub = "w-8 h-8 text-white bg-soft-blue rounded-full";
    }
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        dataLength={Object.keys(this.state.hotels).length}
        next={this.performSearch}
        hasMore={true}
        scrollThreshold={.8}
      >
      <div className="md:flex p-4 md:p-0 scrolling-touch h-auto">
        <div className="md:mt-8 md:ml-8 h-auto md:w-1/4 md:w-1/4">
          <div className="align-center container-sm rounded pt-4 pr-4 pl-4 pb-4 mb-4 border bg-white border-soft-blue">
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
              {this.state.showPeople && (
                <div className="rounded bg-white mt-px">
                  <div className="flex items-center justify-between flex-wrap p-4 border-t border-soft-blue ">
                    <p className="w-1/5">People</p>
                    <button ref="peopleMinus" className={this.state.peopleSub} onClick={() => this.changePeopleValue(this.state.persons - 1)}>-</button>
                    <p className="w-16 md:w-1/5 text-center">{this.state.persons}</p>
                    <button className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changePeopleValue(this.state.persons + 1)}>+</button>
                  </div>
                  <div className="flex items-center justify-between flex-wrap p-4 border-t border-soft-blue ">
                    <p className="w-1/5">Rooms</p>
                    <button ref="roomsMinus" className={this.state.roomSub} onClick={() => this.changeRoomValue(this.state.rooms - 1)}>-</button>
                    <p className="w-16 md:w-1/5 text-center">{this.state.rooms}</p>
                    <button className="w-8 h-8 text-white bg-soft-blue rounded-full" onClick={() => this.changeRoomValue(this.state.rooms + 1)}>+</button>
                  </div>
                </div>)
              }
            </div>
            <div className="flex items-center justify-center mt-2">
              <button className="cursor-pointer bg-soft-blue w-full md:w-full rounded text-white mb-2 p-2 h-10 md:h-16 font-sans text-xl font-bold" type="button" onClick={() => this.search()}>Search</button>
            </div>
          </div>
          <div className="align-center container-sm rounded md:pt-4 pr-4 pl-4 pb-4 bg-white ">
            <button className="Rectangle bg-white border border-soft-blue h-10 md:h-14 md:text-2xl text-lg text-soft-blue w-full font-sans font-bold py-2 px-4 rounded cursor-pointer" 
                    type="button"
                    onClick={() => this.showMap()}
            >
              View on Map
            </button>
          </div>
          <div className="align-center container-sm rounded md:pt-4 pr-4 pl-4 pb-4 md:hidden bg-white ">
            <button ref="optionsButton" className="Rectangle bg-white border md:hidden border-soft-blue h-10 md:h-14 md:text-2xl text-lg text-soft-blue w-full font-sans font-bold py-2 px-4 rounded cursor-pointer" onClick={() => this.toggleOptions()} type="button">Options</button>
          </div>
          <div ref="optionsMenu">
            {this.state.showOptions && (
              <div className="w-full border p-4 border-soft-blue md:border-white mb-2 md:mr-4 rounded" >
                <div className="align-center container-sm font-sans font-bold rounded mb-6 bg-white">
                  <p className="md:text-2xl text-lg text-dark-blue mb-2">Sort By</p>
                  <div className="pl-4">
                    <form>
                      {this.renderSorts()}
                    </form>
                  </div>
                </div>
                <div className="align-center container-sm font-sans font-bold mb-4 rounded bg-white">
                  <p className="md:text-2xl text-lg text-dark-blue mb-4">Filter By</p>
                  <div>
                    <p className="md:text-xl text-base text-dark-blue mb-2">Your Budget</p>
                  </div>
                  <div className="pl-4">
                    <form>
                      {this.renderFilters()}
                    </form>
                  </div>
                </div>

                <div className="align-center container-sm font-sans font-bold rounded mb-4 bg-white">
                  <p className="md:text-xl text-base text-dark-blue mb-2">Amenities</p>
                  <div className="pl-4">
                    <form>
                      {this.renderAmenities()}
                    </form>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        <div className="md:ml-8 mt-4 md:w-3/4 md:mr-8 w-full md:flex-grow h-full">
          <div className="align-center container-sm rounded bg-white overflow-y-auto scrolling-touch" >
            {this.state.hotels && Object.keys(this.state.hotels).length > 0 ?
                this.state.hotels.map(item => <SearchCell hotel={item} />)
              :
              <div className="block font-bold justify-center content-center mt-24 col-md-6">
                {this.state.hotels && !this.state.error && this.state.searched ?
                  <div className="text text-2xl text-red text-center mb-4 ">No Search Results found for this area.</div>
                  :
                  <div className="text text-2xl text-red text-center mb-4 ">{this.state.error}</div>
                }
              </div>
            }
          </div>
        </div>
      </div>
      </InfiniteScroll>
    );
  }
}
export default withRouter(Search);

