// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
let devServer;
const firbaseUtil = require('../util/firebaseTeardown');
module.exports    = {
  before(browser) {
    'use strict';
    devServer = devServer = browser.globals.devServerURL;
  },
  async after(browser) {
    await firbaseUtil.deleteTestUser();
  },
  'open page'(browser) {
    browser.url(devServer).waitForElementVisible('#app', 5000).assert.title('Finance Tracker').end();
  },
  'sign up'(browser) {
    browser.url(devServer).waitForElementVisible('#app', 5000).waitForElementVisible('button[name=loginButton]', 1000).
    click('button[name=loginButton]').waitForElementVisible('input[name=emailField]', 1000).
    setValue('input[name=emailField]', 'iamtheuserthatisusedforacceptancetesting@test.com').
    waitForElementVisible('input[name=passwordField]', 1000).
    setValue('input[name=passwordField]', 'wwwwww').pause(500).click('label[for=createNewAccountCheckbox]').
    waitForElementVisible('input[name=confirmPasswordField]', 1000).
    setValue('input[name=confirmPasswordField]', 'wwwwww').pause(500).click('button[name=submitPasswordLoginDetails]').
    pause(3000).assert.containsText('#profileHeader', 'Welcome to your Profile page, unknown');
  }/*,
  'attempt login'(browser) {
    browser.url(devServer).waitForElementVisible('#app', 5000).waitForElementVisible('button[name=loginButton]', 1000).
    click('button[name=loginButton]').waitForElementVisible('input[name=emailField]', 1000).
    setValue('input[name=emailField]', 'iamtheuserthatisusedforacceptancetesting@test.com').
    waitForElementVisible('input[name=passwordField]', 1000).
    setValue('input[name=passwordField]', 'wwwwww').pause(500).click('button[name=submitPasswordLoginDetails]').
    pause(3000).assert.containsText('#profileHeader', 'Welcome to your Profile page').end();
  }*/

};
