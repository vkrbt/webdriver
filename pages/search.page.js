const Page = require('./page');
const { search } = require('../test/urls');

const getInnerHtml = html => html.replace(/(<([^>]+)>)/ig, "");

class SearchPage extends Page {

  open() {
  super.open(search);
  }

  get results() {
    return this.bookingFrame.$('#search-result');
  }

  get resultList() {
    return this.results.$$('.journey-list');
  }

  get bookingFrame() {
    if (this._bookingFrame) {
      return this._bookingFrame;
    } else {
      return this._bookingFrame = super.frame('booking');
    }
  }

  set city(city) {
    const frame = this.bookingFrame;
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.bs-searchbox')
      .$('input')
      .setValue(city)
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.dropdown-menu.inner')
      .$('.active')
      .click();
  }

  set departureCity(city) {
    const frame = this.bookingFrame;
    frame.$('.btn.dropdown-toggle.btn-default[title="Departure city"]').click();
    this.city = city;
  }

  set destinationCity(city) {
    const frame = this.bookingFrame;
    this.city = city;
  }

  set date(date) {
    this.bookingFrame.$('#date').setValue(date);
  }

  get date() {
    return this.bookingFrame.$('#date').getValue();
  }

  get formValues() {
    return [].map.call(
      this.bookingFrame.$$('.selected.active'),
      item => getInnerHtml(item.$('span.text').getHTML())
    );
  }

  get alert() {
    return $('.alert.alert-info.text-center').getText();
  }

  search() {
    browser.submitForm('#search-form');
  }

}

module.exports = new SearchPage();
