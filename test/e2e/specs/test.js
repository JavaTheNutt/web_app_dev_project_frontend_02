// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
let devServer;
module.exports = {
  before(browser) {
    'use strict';
    devServer = devServer = browser.globals.devServerURL;
  },
  'open page'(browser) {
    browser.url(devServer).waitForElementVisible('#app', 5000).assert.elementPresent('.home').assert.
    elementPresent('.nav-container').assert.containsText('h1', 'This is the home page').assert.elementCount('h1', 1).
    end();
  }
};
