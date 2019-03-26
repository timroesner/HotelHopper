import React, { Component } from 'react';
import '../index.css';
import { withRouter } from 'react-router-dom';
import api from '../helper/endpoints';
import { DateRangePicker,SingleDatePicker } from 'react-dates';
import Geosuggest from 'react-geosuggest';
//import Geosuggest from 'react-geosuggest';

class SearchComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedDatePicker: null,
            startDate: null,
            endDate: null,
            focusedEnd: null,
          }

      }
      check(startDate,endDate){
          console.log(startDate);
          console.log(endDate);
          this.setState(startDate,endDate);
      }
      render(){
        return(
            <div class="mt-4 ml-4 h-full w-1/5">
                <div class="align-center container-sm rounded-lg pt-4 pr-4 pl-4 pb-4 border-t-2 border-b-2 border-l-2 border-r-2 bg-white border-soft-blue">
                <p class="w-full text-center block text-soft-blue font-sans text-2xl font-bold text-center justify-center mb-14">
        Search
        </p>
            <div className="w-full md:w-full h-10 md:h-16 mb-2 md:mr-4 md:text-xl">
            {/* <SingleDatePicker
                  startDate={this.state.startDate}
                  startDatePlaceholderText="Check in"
                  startDateId="start_date"
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  onDatesChange={({ startDate}) => this.setState({ startDate})}
                  focusedInput={this.state.focusedDatePicker}
                  onFocusChange={focusedDatePicker => this.setState({ focusedDatePicker })}
                />
                <SingleDatePicker
                    date={this.state.endDate} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                    id="end_date" // PropTypes.string.isRequired,
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  onDatesChange={({ endDate }) => this.setState({ endDate })}
                  focusedInput={this.state.focusedDatePicker}
                  onFocusChange={focusedDatePicker => this.setState({ focusedDatePicker })}
                />
                <SingleDatePicker
                    required={true}       
                    date={this.state.endDate} // momentPropTypes.momentObj or null
                    onDateChange={endDate => this.setState({ endDate })} // PropTypes.func.isRequired
                    focusedEnd={this.state.focusedEnd} // PropTypes.bool
                    onFocusChange={({ focusedEnd }) => this.setState({ focusedEnd })} // PropTypes.func.isRequired
                    id="end_date" // PropTypes.string.isRequired,
                /> */}
                              <DateRangePicker
                  startDate={this.state.startDate}
                  startDatePlaceholderText="Check in"
                  startDateId="start_date"
                  endDate={this.state.endDate}
                  endDatePlaceholderText="Check out"
                  endDateId="end_date"
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  onDatesChange={({ startDate, endDate }) => this.check({ startDate, endDate })}
                  focusedInput={this.state.focusedDatePicker}
                  onFocusChange={focusedDatePicker => this.setState({ focusedDatePicker })}
                />
                </div>
                </div>
            </div>
        );
      }
}
export default withRouter(SearchComp);