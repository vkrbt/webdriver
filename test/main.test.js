const assert = require('assert');
const { base, search } = require('./urls');

browser.url(base);

describe('Main page', () => {
  it('should have the right title', () => {
    const title = browser.getTitle();
    assert.equal(title, 'Bus tickets for international routes | ECOLINES');
  });

  it('should have email input', () => {
    const emailBtn = browser.element('#fieldEmail').getAttribute('placeholder');
    assert.equal(emailBtn, 'Electronic mail');
  });

  it('should show language button on desktop version of site', () => {
    browser.setViewportSize({
      width: 992,
      height: 500,
    });
    browser.windowHandleSize();
    const languageButton = $('#lang_long').getText();
    assert.equal(languageButton, 'English');
  });

  it('should redirect if search button hit', () => {
    $('button.btn.btn-primary.btn-lg').click();
    const currentUrl = browser.getUrl();
    assert(currentUrl.indexOf(search) != -1);
  });
});
