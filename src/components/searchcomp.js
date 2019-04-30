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
            startFocus: null,
            endFocus: null,
          }

      }
      check(startDate,endDate){
          console.log(startDate);
          console.log(endDate);
          this.setState(startDate,endDate);
      }
      render(){
        return(
            <div class="mt-4 ml-4 h-full w-1/4">
                <div class="align-center container-sm rounded-lg pt-4 pr-4 pl-4 pb-4 border bg-white border-soft-blue">
            <div className="w-full md:w-full mb-3 mt-2 text-center">
             <Geosuggest
              className="w-full md:w-full h-10 md:h-16 mb-2 md:mr-4 md:text-xl border-soft-blue border rounded "
              placeholder="Destination" 
              inputClassName="appearance-none bg-white font-bold rounded w-full h-10 md:h-16 py-2 px-3 text-grey-darker"
              suggestsClassName="absolute z-10 text-grey-darker md:text-xl bg-white list-reset max-h-8 max-w-8"
              suggestItemClassName="p-2 hover:bg-grey-light cursor-pointer border-b-2"
              onSuggestSelect={(txtField) => this.selectedLocation(txtField)}
              types={["(cities)"]}
             />
             </div>
          <div className="w-full md:w-full mb-3 mt-2">
            <SingleDatePicker
                  placeholder="Check in"
                  id="start_date"
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  date={this.state.date} 
                  onDateChange={date => this.setState({ date })} 
                  focused={this.state.startFocus}
                  onFocusChange={({focused:startFocus}) => this.setState({ startFocus })}
                />

                              {/* <DateRangePicker
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
                /> */}
                </div>
                <div className="w-full md:w-full mt-2 ">
                <SingleDatePicker
                    placeholder="Check Out"
                    date={this.state.endDate} 
                    onDateChange={endDate => this.setState({ endDate })} 
                    id="end_date" // PropTypes.string.isRequired,
                  required={true}
                  readOnly={true}
                  orientation={window.innerWidth > 768 ? "horizontal" : "vertical"}
                  focused={this.state.endFocus}
                  onFocusChange={({focused:endFocus}) => this.setState({ endFocus })}
                />
                </div>
                </div>
            </div>
        );
      }
}
export default withRouter(SearchComp);