const assert = require('assert');
const MainPage = require('../pages/main.page');
const SearchPage = require('../pages/search.page');

const searchData = {
  from: 'Minsk (Centralniy)',
  to: 'Vilnius / Airport',
  wrongDate: '2017-12-02',
  date: '2017-12-17',
}

MainPage.open();

describe('Search page', () => {

  it('shouldn\'t find anything with empty search query', () => {
    MainPage.search();
    assert.equal('NoSuchElement', SearchPage.results.type)
  });

  it('should be able to filling fields', () => {
    SearchPage.departureCity = searchData.from;
    SearchPage.wait(500);

    SearchPage.departureCity = searchData.to;
    SearchPage.wait(500);

    const dateField = frame.$('#date')
    dateField.setValue(searchData.wrongDate);
    const values = [].map.call(frame.$$('.selected.active'), item => getInnerHtml(item.$('span.text').getHTML()));

    assert(~values.indexOf(searchData.from) &&
      ~values.indexOf(searchData.to) &&
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
