/* eslint-disable quotes */
// eslint-disable-next-line no-undef
class Reservation extends ReactAxiom.Model {
  static defaultState() {
    return {
      user: "",
      hotel: null,
      room: "",
      checkIn: null,
      checkOut: null,
      totalPrice: null,
      // eslint-disable-next-line comma-dangle
      isCancelled: false
    };
  }

  editReservation(checkIn, checkOut) {
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }

  cancelReservation() {
    this.isCancelled = true;
  }
}
