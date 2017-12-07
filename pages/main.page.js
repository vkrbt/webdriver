const Page = require('./page');
const { base } = require('../test/urls');

class MainPage extends Page {

  open() {
    super.open(base);
  }

  get emailPlaceholder() {
    return $('#fieldEmail').getAttribute('placeholder');
  }

  get languageButtonText() {
    return $('#lang_long').getText();
  }

  search() {
    $('button.btn.btn-primary.btn-lg').click();
  }

  waitForDialog() {
    browser.waitForVisible('.modal-dialog');
  }

}

module.exports = new MainPage();
