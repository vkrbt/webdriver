const assert = require('assert');

const url = 'https://ecolines.by/by/ru';

browser.url(url);

describe('Search page', () => {
    it('shouldn\'t find anything with empty search query', () => {
        $('button.btn.btn-primary.btn-lg').click();
        const searchResults = $('#search-result').type;
        assert.equal('NoSuchElement', searchResults)
    });
});
