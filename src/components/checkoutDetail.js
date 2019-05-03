import React from "react";
import * as moment from "moment";
import StarRating from "react-star-ratings";

class CheckoutDetail extends React.Component {
  render() {
    const reservation = this.props.reservation;
    return (
      <div>
        <div
          key={reservation.id}
          className="w-full"
        >
          <img
            alt="Hotel"
            src={reservation.hotel.imageUrl}
            className='w-full h-48 md:h-64 rounded' 
            style={{objectFit: "cover"}}
          />

          <div className="w-auto">
            <p className="font-bold md:text-2xl my-2">{reservation.hotel.title}</p>
            <StarRating
                rating={reservation.hotel.stars}
                numberOfStars={reservation.hotel.stars}
                starRatedColor="#597aee"
                starSpacing="3px"
                starDimension="25px"
                name='rating'
            />

            <p className="mt-2 text-sm md:text-lg">
              {`${reservation.hotel.street}, ${reservation.hotel.city}, ${reservation.hotel.state}`}
            </p>

            <p className="mt-2 md:text-lg font-medium">
              {reservation.hotel.rating+" / 10 User rating"}
            </p>

            <p className="mt-16 mb-4 text-dark-blue text-sans font-bold text-2xl">Your Booking Details</p>
            <p className="mt-4 text-sm md:text-xl">
              {"Rooms: "}
              <span className="float-right">
                {reservation.roomsString}
              </span>
            </p>
            <p className="mt-4 text-sm md:text-xl">
              {"Check-in: "}
              <span className="float-right">
                {moment.utc(reservation.startDate).format("MMM D, YYYY")}
              </span>
            </p>
            <p className="mt-4 text-sm md:text-xl">
              {"Check-out: "}
              <span className="float-right">
                {moment.utc(reservation.endDate).format("MMM D, YYYY")}
              </span>
            </p>

            <p className="mt-16 mb-4 text-dark-blue text-sans font-bold text-2xl">Your Price Summary</p>
            <p className="mt-4 text-sm md:text-xl">
              {"Nightly Rate: "}
              <span className="float-right">
                {"$"+reservation.nightlyPrice}
              </span>
            </p>
            <p className="mt-4 text-sm md:text-xl">
              {reservation.nights+" Nights: "}
              <span className="float-right">
              {"$"+reservation.total}
              </span>
            </p>
            <p className="mt-4 text-sm md:text-xl">
              {"Tax: "}
              <span className="float-right">
                {"$"+(reservation.total*0.09).toFixed(2)}
              </span>
            </p>
            <p className="font-bold mt-4 text-sm md:text-xl">
              {"Total: "}
              <span className="float-right">
              {"$"+(reservation.total*1.09).toFixed(2)}
              </span>
            </p>

            <p className="mt-16 mb-4 text-dark-blue text-sans font-bold text-xl">Cancellation Fee</p>
            <p className="mt-4 text-sm md:text-xl">
              {"If you cancel, you’ll pay: "}
              <span className="float-right">
                {"$45"}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutDetail;