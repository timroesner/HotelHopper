/* eslint-disable quotes */
// eslint-disable-next-line no-undef
class Room extends ReactAxiom.Model {
  static defaultState() {
    return {
      Hotel: "",
      Beds: null,
      unavailDates: "",
      Amenities: "",
      pricePerNight: null,
      // eslint-disable-next-line comma-dangle
      totalGuests: null
    };
  }
}
