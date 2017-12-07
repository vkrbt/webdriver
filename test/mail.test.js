const assert = require('assert');
const MailPage = require('../pages/mail.page');

const validEmail = 'asdrudes@gmail.com';
const invalidEmail = 'mail@';

MailPage.open();

describe('Subscribtion', () => {
  it('shouldn\'t be success if entered invalid email', () => {
    MailPage.email.setValue(invalidEmail);
    MailPage.subscribe();
    MailPage.waitForDialog();
    assert.equal(MailPage.modalText, 'E-mail is wrong');
    MailPage.closeModal();
  });

  it('should be success if entered valid email', () => {
    MailPage.wait(500);
    MailPage.email.setValue(validEmail);
    MailPage.subscribe();
    MailPage.waitForDialog();
    assert.equal(MailPage.modalText, 'Email already exist!');
  });
});
