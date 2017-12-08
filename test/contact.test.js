const assert = require('assert');
const ContactPage = require('../pages/contact.page');
const { facebook } = require('./urls');

ContactPage.open();

describe('ContactPage page', () => {

  it('should correctly show cities', () => {
    const coordinates = ContactPage.coordinatedOfActiveCity;
    ContactPage.wait(1000);
    assert(~ContactPage.gmapsLink.indexOf(`${coordinates.lat},${coordinates.long}`));
  });

  it('should correctly switch cities', () => {
    ContactPage.selectRandCity();
    ContactPage.wait(1000);
    const coordinates = ContactPage.coordinatedOfActiveCity;
    assert(~ContactPage.gmapsLink.indexOf(`${coordinates.lat},${coordinates.long}`));
  })

  it('should redirect to facebook profile', () => {
    ContactPage.openFacebook();
    ContactPage.wait(500);
    assert(~ContactPage.url.indexOf(facebook));
  });

});
