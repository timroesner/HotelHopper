import React, { Component } from 'react';
import room404 from '../../assets/404.jpg';

class Error extends React.Component {
	constructor(props){
  		super(props);
  		
 }
		
	render() {
    	return (
        <div className="w-full">
          <img src={room404} alt="Room 404" className="w-full-w/o-margins md:w-2/5 h-auto block mx-auto mt-16 rounded-lg" />
          <h1 className="w-full-w/o-margins mx-auto mt-8 text-center text-2xl md:text-4xl">
            The site you are looking for could not be found.
          </h1>
        </div>
		)	
	}
}

export default Error;
