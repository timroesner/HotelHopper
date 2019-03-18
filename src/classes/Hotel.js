/* eslint-disable quotes */
// eslint-disable-next-line no-undef
class Hotel extends ReactAxiom.Model {
  static defaultState() {
    return {
      HName: "",
      Address: "",
      StarRating: null,
      Rooms: [],
      Amenities: [],
      avgUserRating: null,
      hotelReviews: [],
      // eslint-disable-next-line comma-dangle
      cancelFees: null
    };
  }

  displayInfo() {
    return `${this.HName} is located at ${this.Address} and has a rating of ${
      this.StarRating
    }`;
  }

  addReview(review) {
    this.hotelReviews.push(review);
  }

  viewRoom() {
    return this.Rooms;
  }

  viewSpecificRoom(i) {
    return this.Rooms[i];
  }
}
