import React, { Component } from 'react';
import SideMenu from '../../components/sidemenu';
import CreditCardInput from 'react-credit-card-input';
class BillingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname:'',
      lastname:'',
      number:'',
      month:'',
      year:'',
      cvc:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      zip:'',
      country:'',
      date:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
    this.handleCardCVCChange = this.handleCardCVCChange.bind(this);
    this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
  }
  handleCardNumberChange(event){
    this.setState({number: event.target.value});
  }
  handleCardExpiryChange(event){
    console.log(event.target.value);
    this.setState({date:event.target.value});
  }
  handleCardCVCChange(event){
    this.setState({cvc:event.target.value});
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  submitCard(event){
    event.preventDefault();
    if(this.state.firstname != '' && this.state.lastname != '' && this.state.number != '' && this.state.cvc != '' && this.state.date != ''){
      alert("First: " + this.state.firstname + " Last: "+this.state.lastname+ " Card Number:"+ this.state.number + " Date: "+ this.state.cvc + " Date: "+ this.state.date);
    }
    else{
      alert("Missing a field in the card info");
    }
  }
  submitAddress(event){
    event.preventDefault();
    if(this.state.address1 != '' && this.state.city != '' && this.state.state != '' && this.state.zip != ''){
      if(this.state.address2 != ''){
        alert("All fields are filled out");
      }
      else{      
        alert("Everything but the address 2 is filled out");
      }
    }
    else{
      alert("Missing a field in the Address")
    }
  }
  render() {
    return (
      <div className="mt-4 md:mt-16 flex items-flex pb-8">
        {
          window.innerWidth > 415 &&
          <SideMenu selected="Billing Info" items={["Profile", "Billing Info", "Trips", "Rewards"]} />
        }
        <div className="ml-8 md:ml-24 md:mr-0 mr-8 ">
        <div class="w-full h-auto border-b pb-8">
        <form onSubmit={this.submitCard}>
        <label class="block tracking-wide text-black text-2xl mb-4 font-sans font-bold mb-2">
          Debit/Credit Card
        </label>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-2/5 px-3 mb-3 md:mb-2 ">
            <input class="appearance-none text-sm h-10 md:h-14 block w-full bg-white font-bold font-sans md:text-xl text-grey-darkest border border-soft-blue rounded py-3 px-4 pl-8" id="firstname" onChange={this.handleChange} type="text" placeholder="First Name"/>
          </div>
          <div class="md:w-2/5 px-3 mb-3 md:mb-2">

            <input class="appearance-none block h-10 text-sm  md:h-14 w-full font-bold font-sans md:text-xl bg-white text-grey-darkest border border-soft-blue rounded pl-8 py-3 px-4" id="lastname" onChange={this.handleChange} type="text" placeholder="Last Name"/>
          </div>
        </div>
        {/* <div class="w-1/2">
        <label for="payment" class="block text-base font-bold mb-2">Card Information</label>
        <input type="text" id="payment" class="w-5/6  mb-8 font-sans pl-8 font-bold h-14 flex-1  bg-white bg-white text-grey-darkest border border-soft-blue rounded p-3 focus:outline-none" placeholder="Card Number"/>

        <div class="flex">
        <input type="text" id="payment" class="w-3/6  mr-3 font-sans font-bold h-14 inline-block pl-8 bg-white text-grey-darkest border border-soft-blue text-grey-darkest rounded p-3 focus:outline-none" placeholder="Security Code"/>
            <input type="text" id="payment" class="w-16 ml-4 font-sans font-bold h-14 inline-block bg-white text-grey-darkest border border-soft-blue rounded text-center text-grey-darkest p-3 focus:outline-none" placeholder="MM"/>
            <div class="text-grey-dark -mt-1 font-sans font-bold  ml-3 text-5xl"> / </div>
            <input type="text" id="payment" class="w-1/6 ml-4 font-sans font-bold h-14 inline-block bg-white text-grey-darkest border border-soft-blue rounded text-center text-grey-darkest p-3 focus:outline-none" placeholder="YYYY"/>
        </div> */}
        <div class="w-full md:w-3/5 mb-3 md:mb-4">
        <CreditCardInput
            cardNumberInputProps={{ value: this.state.number, onChange: this.handleCardNumberChange }}
            cardExpiryInputProps={{ value: this.state.date, onChange: this.handleCardExpiryChange }}
            cardCVCInputProps={{ value: this.state.cvc, onChange: this.handleCardCVCChange }}
            fieldClassName="input w-full h-10 md:h-14 border border-soft-blue "
            inputClassName="font-bold text-xs md:text-xl font-sans text-grey-darkest"
            containerClassName="font-bold text-xs md:text-xl font-sans text-grey-darkest"
          />
          </div>
    <div className="w-full">
      <input className="bg-soft-blue h-10 md:h-14 md:text-lg md:w-1/4 hover:bg-blue text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit" value="Save Changes" />
    </div>
    </form>
        </div>
        <div class="w-full h-auto mb-12 md:mb-0 mt-8 pb-8">
        <form onSubmit={this.submitAddress}>
        <label class="block tracking-wide text-black text-2xl mb-4 font-sans font-bold mb-2">
          Billing Address
        </label>
            <input class="appearance-none md:w-4/5 w-full text-sm h-10 md:h-14 block bg-white font-bold font-sans md:text-xl text-grey-darkest border border-soft-blue rounded py-3 px-4 pl-8 mb-3" id="address1" onChange={this.handleChange} type="text" placeholder="Address Line 1"/>

            <input class="appearance-none md:w-4/5 w-full text-sm h-10 md:h-14 block bg-white font-bold font-sans md:text-xl text-grey-darkest border border-soft-blue rounded py-3 px-4 pl-8 mb-3" id="address2" onChange={this.handleChange} type="text" placeholder="Address Line 2"/>
            <div class="md:flex mb-2">
            <input class="appearance-none  mb-3 md:w-1/4 w-full text-sm h-10 md:h-14 md:mr-3 block bg-white font-bold font-sans md:text-xl text-grey-darkest border border-soft-blue rounded py-3 px-4 pl-8 md:mb-2" id="city" onChange={this.handleChange} type="text" placeholder="City"/>
            <input class="appearance-none  mb-3 md:w-1/4 w-full text-sm h-10 md:h-14 md:ml-2 md:mr-3 block bg-white font-bold font-sans md:text-xl text-grey-darkest border border-soft-blue rounded py-3 px-4 pl-8 md:mb-2" id="state" onChange={this.handleChange} type="text" placeholder="State"/>
            <input class="appearance-none  mb-3 md:w-1/4 w-full text-sm h-10 md:h-14 md:ml-3 block bg-white font-bold font-sans md:text-xl text-grey-darkest border border-soft-blue rounded py-3 px-4 pl-8 md:mb-2" id="zip" onChange={this.handleChange} type="text" placeholder="Zipcode"/>


            </div>
          
  
    <div className="w-full ">
      <input className="bg-soft-blue h-10 md:h-14 md:text-lg md:w-1/4 hover:bg-blue text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit" value="Save Changes" />
    </div>
    </form>
        </div>
        </div>
        
      </div>
    );
  }
}

export default BillingInfo;
