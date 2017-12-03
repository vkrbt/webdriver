const assert = require('assert');
const { base } = require('./urls');

const validEmail = 'asdrudes@gmail.com';
const invalidEmail = 'mail@';

browser.url(base);

describe('Subscribtion', () => {
  it('shouldn\'t be success if entered invalid email', () => {
    browser.element('#fieldEmail').setValue(invalidEmail);
    browser.element('.get_mail').click();
    browser.waitForVisible('.modal-dialog');
    const modalText = browser.element('.bootbox-body').getText();
    assert.equal(modalText, 'E-mail is wrong');
  });

  it('should be success if entered valid email', () => {
    browser.pause(200);
    $('[data-bb-handler=ok]').click();
    browser.pause(2000);
    browser.element('#fieldEmail').setValue(validEmail);
    browser.element('.get_mail').click();
    browser.waitForVisible('.modal-dialog');
    const modalText = browser.element('.bootbox-body').getText();
    assert.equal(modalText, 'Email already exist!');
  });
});
