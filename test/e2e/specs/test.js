// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
let devServer;
module.exports = {
  before(browser) {
    'use strict';
    devServer = devServer = browser.globals.devServerURL;
  },
  'open page'(browser) {
    browser.url(devServer).waitForElementVisible('#app', 5000).assert.title('Finance Tracker').end();
  },
  'attempt login'(browser) {
    browser.url(devServer).waitForElementVisible('#app', 5000).waitForElementVisible('button[name=loginButton]', 1000).
    click('button[name=loginButton]').waitForElementVisible('input[name=emailField]', 1000).
    setValue('input[name=emailField]', 'root@root.com').waitForElementVisible('input[name=passwordField]', 1000).
    setValue('input[name=passwordField]', 'wwwwww').pause(500).click('button[name=submitPasswordLoginDetails]').
    pause(3000).assert.containsText('#profileHeader','Welcome to your Profile page');
  }
};
