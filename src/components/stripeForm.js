import React from 'react';
import { CardElement } from 'react-stripe-elements';
import { injectStripe } from 'react-stripe-elements';
import api from '../helper/endpoints';

class StripeForm extends React.Component {

    constructor() {
        super()
        this.state = {
            error: "",
				cardholder: "",
				paymentMethods: [],
				cardId: "",
				newCard: true
		  }
		  this.fetchPaymentMethods()
    }

    componentDidUpdate() {
        if(this.props.name !== " " && this.state.cardholder === "") {
            this.setState({ cardholder: this.props.name })
        }
    }

    fetchPaymentMethods = () => {
		const token = window.localStorage.getItem("token")
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
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
		  });
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe && this.state.cardId === "") {
            this.props.stripe.createToken({name: this.state.cardholder})
            .then((payload) => {
                if(payload.error) {
                    this.setState({error: payload.error.message})
                } else {
                    this.props.sendToken(payload.token.id)
                }
            });
        } else {
				this.props.sendToken(this.state.cardId)
        }
	 };
	 
	 renderExistingCards = () => {
		let cardsList = [];
		 this.state.paymentMethods.forEach(card => {
			 cardsList.push(
				 <div className="md:w-3/5 mb-4 font-semibold text-lg flex items-center border-b pb-4" key={card.id}>
				 	<input
						type="radio"
						id="cardId"
						value={card.id}
						checked={this.state.cardId === card.id}
						onChange={this.handleChange}
						className=""
					/>
				 	<img src={require(`../assets/${card.brand}.png`)} alt="card brand" className="mx-4 h-6 w-auto"/>
					<p className="mx-2">···· {card.last4}</p>
					<p className="flex-grow text-right">{card.exp_month}/{card.exp_year}</p>
				 </div>
			 )
		 })
		 return cardsList
	 }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
					{this.renderExistingCards()}
					<div className="md:w-3/5 mb-4 font-semibold text-lg flex items-center">
						<input
							type="radio"
							id="cardId"
							value={""}
							checked={this.state.cardId === ""}
							onChange={this.handleChange}
							className=""
						/>
						<p className="ml-4">Add new card</p>
				 	</div>
					{ this.state.cardId === "" &&
					<div>
						<input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full md:w-3/5 rounded h-14 mb-4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
						id="cardholder" value={this.state.cardholder} onChange={this.handleChange} type="text" placeholder="Cardholder name" />
						<p className="w-full block text-red font-sans text-s font-bold text-left justify-center mb-2">
							{this.state.error}
						</p>
						<div className="shadow bg-white mr-4 border border-soft-blue w-full md:w-3/5 rounded h-14 py-4 px-3 text-grey-darker focus:outline-none focus:shadow-outline">
							<CardElement style={{base: {fontFamily: "inherit", fontWeight: 550, fontSize: "16px"}}}/>
						</div>
					 </div>
					}
                <button className="mt-4 bg-soft-blue rounded text-white py-3 px-4 font-sans text-xl font-bold">Make Reservation</button>
            </form>
        );
    }
}

export default injectStripe(StripeForm);