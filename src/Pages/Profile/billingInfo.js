import React, { Component } from 'react';
import SideMenu from '../../components/sidemenu';
import api from '../../helper/endpoints';
import closeIcon from '../../assets/delete.svg';

class BillingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: [],
      address1:'',
      address2:'',
      city:'',
      state:'',
      zip:'',
      country:'',
      date:'',
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.submitCard = this.submitCard.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
  }

  componentWillMount() {
    this.fetchPaymentMethods()
  }

  fetchPaymentMethods = () => {
    const token = window.localStorage.getItem("token")
    if(token !== null) {
      fetch(api + "/users/paymentMethods", {
        method: "GET",
        headers: {
        'accept': 'application/json',
        'Authorization': "Bearer "+token
        }
      }).then(results => {
        return results.json();
      }).then(data => {
        var cardId = ""
        if(data.data.length > 0) {
          cardId = data.data[0].id
        }
        this.setState({ 
          paymentMethods: data.data, 
          cardId
        })
      })
    } else {
      this.props.history.push(`/login`);
    } 
  }

  delete = (cardId) => {
    console.log(JSON.stringify({"paymentMethodId": cardId}))
    const token = window.localStorage.getItem("token")
		fetch(api + "/users/paymentMethods", {
			method: "DELETE",
			headers: {
			'accept': 'application/json',
      'Authorization': "Bearer "+token,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({"paymentMethodId": cardId})
		}).then(results => {
			return results.json();
		}).then(data => {
      if(data.error) {
        alert(data.message)
      } else {
        window.location.reload();
      }
		}) 
  }
  
  renderExistingCards = () => {
		let cardsList = [];
		 this.state.paymentMethods.forEach(card => {
			 cardsList.push(
				 <div className="mb-4 font-semibold text-lg flex items-center border-b pb-4" key={card.id}>
				 	<img src={require(`../../assets/${card.brand}.png`)} alt="card brand" className="mr-4 h-6 w-auto"/>
					<p className="mx-2">···· {card.last4}</p>
					<p className="flex-grow mr-4 text-right">{card.exp_month}/{card.exp_year}</p>
          <img alt="delete" src={closeIcon} className="h-4 w-auto cursor-pointer" onClick={() => this.delete(card.id)}/>
				 </div>
			 )
		 })
		 return cardsList
	 }

  submitAddress(event){
    event.preventDefault();
    if(this.state.address1 !== '' && this.state.city !== '' && this.state.state !== '' && this.state.zip !== ''){
      if(this.state.address2 !== ''){
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
        <div className="ml-8 md:w-1/2 w-full md:ml-24 md:mr-0 mr-8 ">
          <div className="mb-8">
            <label class="block tracking-wide text-black text-2xl mb-4 font-sans font-bold mb-2">
              Credit / Debit Cards
            </label>
            {this.renderExistingCards()}
          </div>
          <div class="mb-12 md:mb-0 pb-8">
            <form onSubmit={this.submitAddress}>
              <label class="block tracking-wide text-black text-2xl mb-4 font-sans font-bold mb-2">
                Billing Address
              </label>
              <input class="appearance-none  w-full h-10 md:h-14 block bg-white font-bold font-sans  text-grey-darkest border border-soft-blue rounded py-2 px-3 mb-3" id="address1" onChange={this.handleChange} type="text" placeholder="Address Line 1"/>
              <input class="appearance-none w-full  h-10 md:h-14 block bg-white font-bold font-sans  text-grey-darkest border border-soft-blue rounded py-2 px-3 mb-3" id="address2" onChange={this.handleChange} type="text" placeholder="Address Line 2"/>
              <div class="md:flex md:items-flex mb-2">
                <input class="appearance-none  mb-3 w-full  h-10 md:h-14 md:mr-3 block bg-white font-bold font-sans  text-grey-darkest border border-soft-blue rounded py-2 px-3 md:mb-2" id="city" onChange={this.handleChange} type="text" placeholder="City"/>
                <input class="appearance-none  mb-3  w-full  h-10 md:h-14 md:ml-2 md:mr-3 block bg-white font-bold font-sans text-grey-darkest border border-soft-blue rounded py-2 px-3 md:mb-2" id="state" onChange={this.handleChange} type="text" placeholder="State"/>
                <input class="appearance-none  mb-3 w-full h-10 md:h-14 md:ml-3 block bg-white font-bold font-sans  text-grey-darkest border border-soft-blue rounded py-2 px-3 md:mb-2" id="zip" onChange={this.handleChange} type="text" placeholder="Zipcode"/>
              </div>
              <div className="w-full ">
                <input className="bg-soft-blue cursor-pointer rounded text-white py-3 px-4 font-sans text-xl font-bold" type="submit" value="Save changes" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BillingInfo;


