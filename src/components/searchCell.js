
  import React from 'react';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import StarRatings from 'react-star-ratings';
import queryString from 'query-string';

class SearchCell extends React.Component {
    goTo(event) {
        const value = "hotel/"+event;
        this.props.history.push(`/${value}`);
      }

    render() {
        const hotel = this.props.hotel;
        
        const values = queryString.parse(this.props.location.search);
        let hotelQuery = hotel.hotelId + "?startDate=" + values["startDate"] + "&endDate=" + values["endDate"];

        return(
        <div class="z-50 flex mt-1 w-full overflow-hidden border-b py-3 border-grey-light" value={hotel.hotelId} onClick={e => this.goTo(hotelQuery)} style={{ cursor: 'pointer' }}>
                  <div className="w-full justify-between flex col-md-6 ">
                    <div class="flex col-md-6">
                    <img class="h-32 w-48 md:h-48 md:w-64 mr-2 rounded "  src={hotel.imageUrl}/>
                    
                    <div class="justify-between flex-col">  
                      <div  className="font-bold w-full overflow-hidden align-start text-lg md:text-xl ml-2 mb-2">{hotel.title}</div>
                      <div class=" text-grey font-sans align-start pb:2 md:pb-12 md:pb-24 text-sm md:text-base ml-2 mt-2">{hotel.city}</div>
                      {window.innerWidth < 768 && ( 
                    <div class="font-bold align-start mt-2 mb-2 md:pb-24 text-sm md:text-xl ml-2"> 
                      <StarRatings
                      changeRating={this.changeRating}
                        rating={hotel.stars}
                        starRatedColor="#597aee"
                        starSpacing="3px"
                        starDimension="20px"
                        numberOfStars={5}
                        name='rating'
                      /></div>
                      )}
                      
                      <div class=" font-bold align-start mb-2 md:pb-4 text-sm md:text-xl ml-2">{hotel.rating} / 10 Guest Rating</div>
                      {window.innerWidth < 768 && ( 
                      <div class="font-bold relative pin-b pin-r md:pb-4 text-lg md:text-2xl ml-2">{"$"+hotel.lowestPrice}</div>
  
                    )}
                    </div>
                    </div>
                    
                    <div class="text-right flex-col md:pt-0 justify-between align-text-bottom ">    
                    {window.innerWidth > 768 ?
                    <div class="font-bold align-start pb-12 md:pb-24 text-sm md:text-xl ml-2"> 
                    
                      <StarRatings
                        starRatedColor="#597aee"
                        starSpacing="3px"
                        numberOfStars={5}
                        changeRating={this.changeRating}
                        starDimension="30px"
                        rating={hotel.stars}
                        name='rating'
                      /></div>        
                    : <div class="pb-24"></div>}
                    {window.innerWidth > 768 &&
                      <div class="font-bold text-right relative pin-b pin-r pt-4 md:pb-4 text-lg md:text-2xl ml-2">{"$"+hotel.lowestPrice}</div>
                    }
          
                      </div>
                      </div>
                    
                    
              </div>
        )
    }
}

export default withRouter(SearchCell);