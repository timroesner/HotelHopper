import React from "react";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import StarRating from "react-star-ratings";

class BookingDetailComp extends React.Component {
  createRoomsString = () => {
    var string = "";
    if (this.props.reservation.reservedRooms !== undefined) {
      this.props.reservation.reservedRooms.forEach(room => {
        string += "\u00a0\u00a0\u00a0" + room.count + " " + room.roomType.title;
      });
    }
    return string;
  };

  render() {
    const reservation = this.props.reservation;
    return (
      <div>
        <div
          key={reservation.id}
          className="w-full flex flex-col md:flex-row items-stretch "
        >
          <img
            alt="Hotel"
            src={"https://t-ec.bstatic.com/images/hotel/max500/886/88658230.jpg".replace("max500", "max1024x768")}
            className="h-48 w-full md:h-96 md:w-3/5 rounded md:rounded-lg"
            style={{objectFit: "cover"}}
          />
          <div className="mt-4 md:mt-0 md:ml-6 md:w-1/2">
            <p className="font-bold md:text-2xl">{reservation.hotel.title}</p>
            <div className="mt-2">
              <StarRating
                rating={reservation.hotel.stars}
                numberOfStars={reservation.hotel.stars}
                starRatedColor="#597aee"
                starSpacing="3px"
                starDimension="20px"
                name="rating"
              />
            </div>

            <p className="mt-2 text-sm md:text-lg">
              {`${reservation.hotel.street}, ${reservation.hotel.city}, ${
                reservation.hotel.state
              }`}
            </p>

            <p className="mt-2 md:text-lg font-medium">
              {reservation.hotel.rating + " / 10 User rating"}
            </p>

            <p className="mt-6 mb-2 text-sans font-semibold text-xl">Your Booking Details</p>
            <p className="text-sm md:text-lg">
              {"Rooms: "}
              <span className="float-right">{this.createRoomsString()}</span>
            </p>
            <p className="mt-4 text-sm md:text-lg">
              {"Check-in: "}
              <span className="float-right">
                {moment(reservation.startDate).format("MMM D, YYYY")}
              </span>
            </p>
            <p className="mt-4 text-sm md:text-lg">
              {"Check-out: "}
              <span className="float-right">
                {moment(reservation.endDate).format("MMM D, YYYY")}
              </span>
            </p>
            <p className="mt-4 text-sm md:text-lg">
              {"Total paid: "}
              <span className="float-right">
                {"$" + (reservation.totalCost * 1.09).toFixed(2)}
              </span>
            </p>
            <p className="mt-4 text-sm md:text-lg">
              {"Cancellation fee: "}
              <span className="float-right">{"$45"}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BookingDetailComp);
