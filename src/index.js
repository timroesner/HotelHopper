import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import './index.css';
import './react-dates-override.css';
import * as serviceWorker from './serviceWorker';
import{Router, Route,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Authentication/login';
import Signup from './Pages/Authentication/signup';
import Forgot from './Pages/Authentication/forgotpass';
import Reset from './Pages/Authentication/resetpass';
import Error from './Pages/Globals/error';
import Profile from './Pages/Profile/profile';
import BillingInfo from './Pages/Profile/billingInfo';
import Trips from './Pages/Profile/trips';
import Rewards from './Pages/Profile/rewards';
import Search from './Pages/Reservation Related/search';
import Checkout from './Pages/Reservation Related/checkout';
import Confirmation from './Pages/Reservation Related/confirmation';
import MapPage from './Pages/Reservation Related/map';
import Hotel from './Pages/Reservation Related/hotel';
import Header from './components/header'
import { StripeProvider } from 'react-stripe-elements';


const browserHistory = createBrowserHistory();
ReactDOM.render(
    <StripeProvider apiKey="pk_test_jb9MEwI7swz2HaPrZXzMQSSL00stxhlhgd">
    <Router path="/App" history={browserHistory}>
    <div>
        <Header/>
       
        <div className="pt-16"/>
        <Switch>
            <Route exact path = '/' component ={LandingPage}  />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signUp' component={Signup}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/billinginfo' component={BillingInfo}/>
            <Route exact path='/trips' component={Trips}/>
            <Route exact path='/rewards' component={Rewards}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/search/:params' component={Search}/>
            <Route exact path='/checkout' component={Checkout} />	
            <Route exact path='/confirmation/:params' component={Confirmation} />
            <Route exact path='/forgot' component={Forgot} />
            <Route exact path='/map' component={MapPage} />
            <Route exact path='/hotel/:id' component={Hotel} />
            <Route exact path='/reset/:token' component={Reset} />
            <Route component={Error}/>
        </Switch>
    </div>
    </Router>
    </StripeProvider>, document.getElementById('root')
    
    );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
