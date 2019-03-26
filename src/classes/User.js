/* eslint-disable quotes */
// eslint-disable-next-line no-undef
class User extends ReactAxiom.Model {
  static defaultState() {
    return {
      FName: "",
      LName: "",
      Hotels: [],
      Reservations: [],
      stripeId: null,
      // eslint-disable-next-line comma-dangle
      rewardPoints: null
    };
  }

  getName() {
    return this.FName + this.LName;
  }

  changeName(F, L) {
    this.FName = F;
    this.LName = L;
  }

  spendPoints(points) {
    this.rewardPoints -= points;
  }

  addPoints(points) {
    this.rewardPoints += points;
  }

  addFavoriteHotel(hotel) {
    this.Hotels.push(hotel);
  }

  removeFavoriteHotel(hotel) {
    this.Hotels.splice(this.Hotels.indexOf(hotel), 1);
  }

  viewFavoriteHotels() {
    return this.Hotels;
  }
}
