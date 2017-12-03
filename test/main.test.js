const assert = require('assert');

const url = 'https://ecolines.by/by/ru';


browser.url(url);

describe('Main page', () => {
    it('should have the right title', () => {
        const title = browser.getTitle();
        assert.equal(title, 'Автобусные билеты на международные перевозки | ECOLINES');
    });

    it('should have email input', () => {
        const languageBtn = browser.element('#fieldEmail').getAttribute('placeholder');
        assert.equal(languageBtn, 'Электронная почта');
    });

    it('should show language button on desktop version of site', () => {
        browser.setViewportSize({
            width: 992,
            height: 500,
        });
        browser.windowHandleSize();
        const languageButton = $('#lang_long').getText();
        assert.equal(languageButton, 'Pусский');
    });

    it('should redirect if search button hit', () => {
        $('button.btn.btn-primary.btn-lg').click();
        const currentUrl = browser.getUrl();
        assert(currentUrl.indexOf('https://ecolines.by/by/ru/booking-search') != -1);
    });
});
