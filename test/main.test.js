const assert = require('assert');
const { search } = require('./urls');
const MainPage = require('../pages/main.page');

MainPage.open()

describe('Main page', () => {
  it('should have the right title', () => {
    assert.equal(MainPage.title, 'Bus tickets for international routes | ECOLINES');
  });

  it('should have email input', () => {
    assert.equal(MainPage.emailPlaceholder, 'Electronic mail');
  });

  it('should show language button on desktop version of site', () => {
    MainPage.resize(992, 500);
    assert.equal(MainPage.languageButtonText, 'English');
  });

  it('should redirect if search button hit', () => {
    MainPage.search();
    assert(~MainPage.url.indexOf(search));
  });
});
