/* eslint-disable quotes */
// eslint-disable-next-line no-undef
class Rating extends ReactAxiom.Model {
  static defaultState() {
    return {
      user: "",
      hotel: null,
      review: "",
      // eslint-disable-next-line comma-dangle
      value: null
    };
  }

  modifyReview(string) {
    this.review = string;
  }

  deleteReview() {
    this.review = null;
  }

  createReview(user, hotel, review, value) {
    this.user = user;
    this.hotel = hotel;
    this.review = review;
    this.value = value;
  }
}
