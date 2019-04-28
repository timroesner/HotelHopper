import React from 'react';
import { CardElement } from 'react-stripe-elements';
import { injectStripe } from 'react-stripe-elements';

class StripeForm extends React.Component {

    constructor() {
        super()
        this.state = {
            error: ""
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken({name: this.props.name})
            .then((payload) => {
                if(payload.error) {
                    this.setState({error: payload.error.message})
                } else {
                    this.props.sendToken(payload.token.id)
                }
            });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p className="w-full block text-red font-sans text-s font-bold text-left justify-center mb-2">
                    {this.state.error}
                </p>
                <div className="shadow bg-white mr-4 border border-soft-blue w-full md:w-3/5 rounded h-14 py-4 px-3 text-grey-darker focus:outline-none focus:shadow-outline">
                    <CardElement style={{base: {fontFamily: "inherit", fontWeight: 550, fontSize: "16px"}}}/>
                </div>
                <button className="mt-8 bg-soft-blue rounded text-white py-3 px-4 font-sans text-xl font-bold">Make Reservation</button>
            </form>
        );
    }
}

export default injectStripe(StripeForm);