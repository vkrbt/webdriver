const Page = require('./page');
const { contact } = require('../test/urls');

const getRandCity = (cities) => {
  const pos = Math.floor(Math.random() * cities.length);
  return(cities[pos])
}

class ContactPage extends Page {

  open() {
    super.open(contact);
  }

  openFacebook() {
    $('a[href="//facebook.com/ECOLINES"]').click();
  }

  get coordinatedOfActiveCity() {
    const active = $('li.list-group-item.active');
    return {
      lat: active.getAttribute('lat'),
      long: active.getAttribute('long'),
    }
  }

  get gmapsLink() {
    return $('a[title="Click to see this area on Google Maps"]').getAttribute('href');
  }

  selectRandCity() {
    const cities = $$('li.list-group-item[href="#"]');
    getRandCity(cities).click();
  }
}

module.exports = new ContactPage();
