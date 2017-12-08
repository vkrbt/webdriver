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
    assert.equal('NoSuchElement', SearchPage.results.type);
  });

  it('should be able to filling fields', () => {
    SearchPage.departureCity = searchData.from;
    SearchPage.wait(500);

    SearchPage.destinationCity = searchData.to;
    SearchPage.wait(500);

    SearchPage.date = searchData.wrongDate;
    const values = SearchPage.formValues;

    assert(~values.indexOf(searchData.from) &&
      ~values.indexOf(searchData.to) &&
      SearchPage.date === searchData.wrongDate
    );

  });

  it('shouldn\'t find anything with wrong date and should show alert', () => {
    SearchPage.search();
    SearchPage.wait(500);
    assert.equal(SearchPage.alert, 'According to specified criteria we did not find a trip');
  });

  it('should find somethibg with valid date and directions', () => {
    SearchPage.wait(500);

    SearchPage.date = searchData.date;
    SearchPage.search();

    assert(SearchPage.resultList.length !== 0);
  });
});
