
import React from 'react';
import { withRouter } from 'react-router-dom';
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
                    <div className="h-32 w-48 md:h-48 md:w-64 mr-2 rounded overflow-hidden">
                      <img class="w-full h-auto rounded" alt="of Hotel" src={hotel.imageUrl}/>
                    </div>
                    <div class="justify-between flex-col md:ml-8">  
                      <div  className="font-bold w-full overflow-hidden align-start text-lg md:text-xl ml-2 mb-2">{hotel.title}</div>
                      <div class=" text-grey-dark font-sans align-start pb:2 text-sm md:text-base ml-2 mt-2">{hotel.city}</div>
                      <div class="font-bold align-start mt-2 mb-2 md:mb-4 text-sm md:text-xl ml-2"> 
                        <StarRatings
                          changeRating={this.changeRating}
                          rating={hotel.stars}
                          numberOfStars={hotel.stars}
                          starRatedColor="#597aee"
                          starSpacing="3px"
                          starDimension="20px"
                          name='rating'
                        />
                      </div>
                      
                      <div class=" font-bold align-start mb-2 md:pb-4 text-sm md:text-xl ml-2">{hotel.rating} / 10 Guest Rating</div>
                      <div class="relative pin-b pin-r md:pb-4 ml-2 flex flex-col md:flex-row items-baseline"><p className="text-grey-dark text-xs md:text-base mb-1 mr-2">Rooms starting at</p><p className="font-bold text-lg md:text-2xl ">{"$"+hotel.lowestPrice}</p></div>
                    </div>
                    </div>
              </div>
        </div>
        )
    }
}

export default withRouter(SearchCell);
