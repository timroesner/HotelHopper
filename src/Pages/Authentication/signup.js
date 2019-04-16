import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../helper/endpoints';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            secondpassword: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
    }

    handleSubmit(event) {
        let success = false;
        event.preventDefault();
        if (this.state.password === this.state.secondpassword) {
            let user = {
                "firstName": this.state.firstname,
                "lastName": this.state.lastname,
                "email": this.state.email,
                "password": this.state.password
            };
            event.preventDefault();
            fetch(api + "/auth/register", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data["error"]) {
                        this.setState({
                            error: data["message"]
                        });
                    }
                    else {
                        success = true;
                        let tokenKey = "token";
                        let tokenValue = data["data"]["token"];
                        window.localStorage.setItem(tokenKey, tokenValue);
                        window.localStorage.setItem("currentUser", JSON.stringify({firstName: user["firstName"]}));
                    }
                    if (success) {
                        this.props.history.push('/');
                    }

                }.bind(this));
        }
        else {
            this.setState({
                error: "Passwords do not match."
            });

        }
    }

    render() {
        return (

            <div className="flex items-center h-full w-full">
                <div className="container-sm w-full-w/o-margins max-w-sm mx-auto mt-1/10 bg-white rounded">
                    <p className="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-14">
                        Welcome to Hotel Hopper
                    </p>
                    <form className="mb-4 items-center" onSubmit={this.handleSubmit}>
                        <div className="flex flex-col mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="firstname" onChange={this.handleChange} type="text" placeholder="First name" />
                        </div>

                        <div className="flex flex-col mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="lastname" onChange={this.handleChange} type="text" placeholder="Last name" />
                        </div>

                        <div className="flex flex-col mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="email" onChange={this.handleChange} type="text" placeholder="Enter email" />
                        </div>

                        <div className="flex flex-col mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="password" onChange={this.handleChange} type="password" placeholder="Enter password" />
                        </div>

                        <div className="flex flex-col mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="secondpassword" onChange={this.handleChange} type="password" placeholder="Re-enter password" />
                        </div>
                        <p className="w-full block text-red text-center font-sans text-s font-bold justify-center mb-4">
                            {this.state.error}
                        </p>
                        <div className="flex items-center justify-center">
                            <input className="Rectangle bg-soft-blue h-14 text-lg w-full hover:bg-blue text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit" value="Create Account" />
                        </div>
                    </form>

                    <div className="flex justify-center col-md-6 items-center mb-4">
                        <p className="items-center mr-1 text-s text-grey"> Already have an account?</p>
                        <button className="items-center ml-1 text-soft-blue font-sans text-bold hover:text-blue text-s font-bold cursor-pointer"
                            value="login" onClick={e => this.goTo(e)}>Sign in</button>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(Signup);
