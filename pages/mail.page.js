const Page = require('./page');
const { base } = require('../test/urls');

class MailPage extends Page {

  open() {
    super.open(base);
  }

  get email() {
    return browser.element('#fieldEmail');
  }

  get modalText() {
    return browser.element('.bootbox-body').getText();
  }

  subscribe() {
    return browser.element('.get_mail').click()
  }

  waitForDialog() {
    browser.waitForVisible('.modal-dialog');
  }

  closeModal() {
    browser.pause(200);
    $('[data-bb-handler=ok]').click();
  }

}

module.exports = new MailPage();
