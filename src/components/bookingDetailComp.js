import React from "react";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import StarRating from "react-star-ratings";

class BookingDetailComp extends React.Component {
  render() {
    const reservation = this.props.reservation;
    return (
      <div>
        <div
          key={reservation.id}
          className="w-full h-20 md:h-64 flex items-flex mt-8 justify-center"
        >
          <img
            alt="Hotel"
            src={reservation.hotel.image}
            className="h-full w-auto rounded"
          />

          <div className="ml-4 md:ml-8 w-auto">
            <p className="font-bold md:text-2xl">{reservation.hotel.title}</p>
            <div className="">
              <StarRating name="rating" size={10} totalStars={5} rating={4} />
            </div>

            <p className="mt-1 md:mt-2 text-xs md:text-lg">
              {reservation.hotel.address}
            </p>
            <p className="mt-1 md:mt-2 text-xs md:text-lg">
              {reservation.hotel.rating}
            </p>

            <p className="mt-3 md:mt-8 text-sm md:text-xl">
              {"Room: " + reservation.roomType}
            </p>
            <p className="mt-3 md:mt-4 text-sm md:text-xl">
              {"Check-in: "}
              <span className="float-right">
                {moment(reservation.startDate).format("MMM D, YYYY")}
              </span>
            </p>
            <p className="text-sm md:text-xl">
              {"Check-Out: "}
              <span className="float-right">
                {moment(reservation.endDate).format("MMM D, YYYY")}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BookingDetailComp);
