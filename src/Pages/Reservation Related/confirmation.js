import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import BookingDetailComp from '../../components/bookingDetailComp';

class Confirmation extends Component {
  
  constructor(props) {
    super(props);

    let booking = {
      hotel: {
          title: "MGM Grand Hotel & Casino",
          image: "https://mgmgrand.mgmresorts.com/content/dam/MGM/mgm-grand/hotel/mgm-grand/exterior/mgm-grand-hotel-mgm-grand-exterior-hero-shot-@2x.jpg",
          address: "3799 Las Vegas Blvd S, Las Vegas, NV",
          rating: "4.1/5 Very Good"
      },
      id: "123",
      roomType: "Grand Queen Room",
      startDate: "2019-06-08",
      endDate: "2019-06-14",
      status: 'approved'
    }

    this.state = {
      booking: booking
    }
  }

  render() {
    console.log(this.props.match.params.params);
    if(this.props.match.params.params === undefined){
      return (
      <div className="App">
        <div>
        
          
          <p className="md:text-4xl lg:text-3xl text-lg text-dark-blue font-sans font-bold mb-4 md:mb-12">
              Your Booking Details
          </p>
          
          <BookingDetailComp reservation = {this.state.booking}/>

        
        </div>
      </div>
    );
  }
    else{
    var param =this.props.match.params.params;
      return (
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Hotel Hopper's Temporary Post-Checkout Confirmation Page for {param}
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              > 
                Learn React
              </a>
            </header>
          </div>
        </div>
      );
    }
  }
}

export default Confirmation;
