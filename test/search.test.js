const assert = require('assert');
const { base, search } = require('./urls');

const searchData = {
  from: 'Minsk (Centralniy)',
  to: 'Vilnius / Airport',
  wrongDate: '2017-12-02',
  date: '2017-12-17',
}

browser.url(base);

const getInnerHtml = html => html.replace(/(<([^>]+)>)/ig, "");

describe('Search page', () => {

  it('shouldn\'t find anything with empty search query', () => {
    $('button.btn.btn-primary.btn-lg').click();
    const searchResults = $('#search-result').type;
    assert.equal('NoSuchElement', searchResults)
  });

  it('should be able to filling fields', () => {
    const frame = browser.frame('booking');
    frame
      .$('.btn.dropdown-toggle.btn-default[title="Departure city"]').click()
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.bs-searchbox')
      .$('input')
      .setValue(searchData.from);
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.dropdown-menu.inner')
      .$('.active')
      .click();

    browser.pause(500);

    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.bs-searchbox')
      .$('input')
      .setValue(searchData.to);
    frame
      .$('.btn-group.bootstrap-select.form-control.open')
      .$('.dropdown-menu.inner')
      .$('.active')
      .click();

    browser.pause(500);

    const dateField = frame.$('#date')
    dateField.setValue(searchData.wrongDate);
    const values = [].map.call(frame.$$('.selected.active'), item => getInnerHtml(item.$('span.text').getHTML()));

    assert(values.indexOf(searchData.from) !== -1 &&
      values.indexOf(searchData.to) !== -1 &&
      dateField.getValue() === searchData.wrongDate
    );

  });

  it('shouldn\'t find anything with wrong date and should show alert', () => {
    browser.submitForm('#search-form');
    const alertText = $('.alert.alert-info.text-center').getText();
    assert.equal(alertText, 'According to specified criteria we did not find a trip');
  });

  it('should find somethibg with valid date and directions', () => {
    browser.url(search);

    const frame = browser.frame('booking');

    browser.pause(500)

    const dateField = frame.$('#date')
    dateField.setValue(searchData.date);
    const values = [].map.call(frame.$$('.selected.active'), item => getInnerHtml(item.$('span.text').getHTML()));
    browser.submitForm('#search-form');

    const results = frame.$('#search-result').$$('.journey-list');

    assert(results.length !== 0);
  });
});
