/* eslint-disable quotes */
// eslint-disable-next-line no-undef
class Address extends ReactAxiom.Model {
  static defaultState() {
    return {
      Street: "",
      City: null,
      ZIP: "",
      // eslint-disable-next-line comma-dangle
      State: null
    };
  }

  getFullAddress() {
    return `${this.Street} ${this.City} ${this.State} ${this.ZIP}`;
  }
}
