const Page = require('./page');
const { base } = require('../test/urls');

const getInnerHtml = html => html.replace(/(<([^>]+)>)/ig, "");

class SearchPage extends Page {

  open() {
    super.open(base);
  }

  get results() {
    return this.bookingFrame.$('#search-result');
  }

  get bookingFrame() {
    return super.frame('booking');
  }

  set departureCity(city) {
    const frame = this.bookingFrame;
    frame.$('.btn.dropdown-toggle.btn-default[title="Departure city"]').click();
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.bs-searchbox')
      .$('input')
      .setValue(city)

      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.dropdown-menu.inner')
      .$('.active')
      .click();
  }

  set destinationCity(city) {
    const frame = this.bookingFrame;
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.bs-searchbox')
      .$('input')
      .setValue(city);
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.dropdown-menu.inner')
      .$('.active')
      .click();
  }

  search() {

  }

}

module.exports = new SearchPage();
