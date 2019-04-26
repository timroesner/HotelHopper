import React from 'react';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';

class TripCell extends React.Component {

    navigateTo(id) {
        this.props.history.push(`/confirmation/${id}`);
    }

    getNumberOfRooms(reservation) {
        var numberOfRooms = 0
        reservation.reservedRooms.forEach(room => {
            numberOfRooms += room.count
        })
        return numberOfRooms
    }

    render() {
        const reservation = this.props.reservation
        return(
            <div key={reservation.id} 
            className="w-full h-20 md:h-48 flex items-flex mt-8 cursor-pointer"
            onClick={() => {
                reservation.status === 'canceled' ?
                alert("This reservation has been canceled") :
                this.navigateTo(reservation.id)
            }}
            >
                <img alt="Hotel" src={reservation.hotel.image} className="h-full w-auto rounded"/>
                <div className="ml-4 md:ml-8 w-auto">
                    <p className="font-bold md:text-2xl">{reservation.hotel.title}</p>
                    <p className="mt-1 md:mt-2 text-xs md:text-lg">{reservation.hotel.address}</p>
                    {
                        reservation.status === "canceled" &&
                        <p className="w-24 rounded border-2 border-red p-1 absolute md:relative text-center font-bold bg-red md:bg-white text-white md:text-red md:mt-4 -mb-12">Canceled</p>
                    }
                    <p className="mt-3 md:mt-16 text-sm md:text-xl">{this.getNumberOfRooms(reservation)}{this.getNumberOfRooms(reservation) > 1 ? " rooms" : " room"}</p>
                    <p className="mt-1 md:mt-4 text-sm md:text-xl">{moment(reservation.startDate).format("MMM D")+" - "+moment(reservation.endDate).format("MMM D, YYYY")}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(TripCell);