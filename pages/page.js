module.exports = class Page {

  get title() {
    return browser.getTitle();
  }

  get url() {
    return browser.getUrl();
  }

  frame(name) {
    return browser.frame(name);
  }

  open(path) {
    browser.url(path);
  }

  wait(ms) {
    browser.pause(ms);
  }

  resize(width, height) {
    browser.setViewportSize({
      width,
      height,
    });
    browser.windowHandleSize();
  }

}
