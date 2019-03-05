import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import{Router, Route,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './login';
import Signup from './signup';
import Search from './search';
import Profile from './profile';
import Error from './error';
const browserHistory = createBrowserHistory()
ReactDOM.render(
    <Router path="/App" history={browserHistory}>
    <Switch>
    <Route exact path = '/' component ={App}  />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signUp' component={Signup}/>
	<Route exact path='/profile' component={Profile}/>
    <Route exact path='/search/' component={Search}/>
    <Route exact path='/search/:params' component={Search}/>			
    <Route component={Error}/>
    </Switch>
    </Router>, document.getElementById('root')
    );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
