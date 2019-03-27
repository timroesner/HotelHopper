import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../helper/endpoints';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
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
        event.preventDefault();
        let success = false;

        let user = {
            "email": this.state.email,
            "password": this.state.password
        };
        fetch(api + "/auth/login", {
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
                    if (data["message"]["email"]) {
                        this.setState({
                            error: data["message"]["email"]
                        });
                    }
                    else if (data["message"]["password"]) {
                        this.setState({
                            error: data["message"]["password"]
                        });
                    }
                    else {
                        this.setState({
                            error: data["message"]
                        });
                    }
                }
                else {
                    success = true;
                    let tokenKey = "token";
                    let tokenValue = data["data"]["token"];
                    window.localStorage.setItem(tokenKey, tokenValue);
                }
                if (success) {
                    this.props.history.push('/');
                }

            }.bind(this));




    }

    render() {
        return (

            <div class="flex items-center h-full w-full">
                <div class="container-sm mx-auto mt-1/10 bg-white rounded w-full-w/o-margins max-w-xs">
                    <p class="w-full block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-14">
                        Sign in to Hotel Hopper
                     </p>
                    <p class="w-full block text-red font-sans text-s font-bold text-left justify-center mb-2">
                        {this.state.error}
                    </p>
                    <form class="mb-4 items-center" onSubmit={this.handleSubmit}>
                        <div class="flex flex-col mb-4 items-center">
                            <input class="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14  py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="email" value={this.state.email} onChange={this.handleChange} type="text" placeholder="Enter email" />
                        </div>
                        <div class="flex flex-col items-center">
                            <input class="shadow appearance-none mb-2 bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder=" Enter password" />

                        </div>
                        <div class="flex justify-left mb-8 ml-10px items-center">
                            <button type="button" class="flex text-soft-blue hover:text-dark-blue text-xs " value="forgot" onClick={e => this.goTo(e)} style={{ cursor: 'pointer' }}>Forgot your Password?</button>
                        </div>
                        <div class="flex items-center justify-center">
                            <input class="Rectangle bg-soft-blue h-14 text-lg w-full hover:bg-blue text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit" value="Sign In" />
                        </div>
                    </form>
                    <div class="flex justify-center col-md-6 items-center">
                        <p class="items-center mr-1 text-grey"> New to Hotel Hopper?</p>
                        <button class="items-center ml-1 text-soft-blue text-sm md:text-base font-sans text-bold hover:text-blue font-bold "
                            value="signUp" onClick={e => this.goTo(e)} style={{ cursor: 'pointer' }}>Create an Account</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Login);