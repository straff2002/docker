var LoginPage = require('../pages/login.page.js');
var UserPage = require('../pages/user.page.js');
var FirstRunWizardPage = require('../pages/firstRunWizard.page.js');
var Screenshot = require('../helper/screenshot.js');

describe('Authentication', function() {
  var params = browser.params;
  var loginPage;
  
  beforeEach(function() {
    isAngularSite(false);
    loginPage = new LoginPage(params.baseUrl);
    browser.manage().deleteAllCookies(); // logout the hard way
    loginPage.get();
  });

  it('should show a logo', function() {
    expect(element(by.css('.logo'))).toBeDefined();
  });

  it('should load the login page', function() {
    browser.takeScreenshot().then(function (png) {
        new Screenshot(png, 'LoginPage.png');
    });

    expect(loginPage.isLoginPage()).toEqual(true);
  });
  
  it('should meet the locator dependencies', function() {
    expect(loginPage.loginForm.isDisplayed()).toBeTruthy();
    expect(loginPage.userInput.isDisplayed()).toBeTruthy();
    expect(loginPage.passwordInput.isDisplayed()).toBeTruthy();
    expect(loginPage.loginButton.isDisplayed()).toBeTruthy();
  });
  
  it('should not load the files page url', function() {
    expect(browser.getCurrentUrl()).not.toContain('index.php/apps/files/');
  });
  
  it('should login with admin account', function() {    
    loginPage.fillUserCredentilas(params.login.user, params.login.password);
    loginPage.loginButton.click();
    browser.takeScreenshot().then(function (png) {
        new Screenshot(png, 'LoginAsAdmin.png');
    });
    expect(browser.getCurrentUrl()).toContain('index.php/apps/files/');
  });
  
  it('should return to the login page after logout', function() {
    loginPage.login(params.login.user, params.login.password);
    expect(browser.getCurrentUrl()).not.toEqual(loginPage.url);
    
    loginPage.logout();
    expect(browser.getCurrentUrl()).toEqual(loginPage.url);
  });
  
  it('should not login with wrong credentials', function() {    
    loginPage.fillUserCredentilas('wrongName', 'wrongPass');
    loginPage.loginButton.click();
    browser.takeScreenshot().then(function (png) {
        new Screenshot(png, 'LoginWrong.png');
    });
    expect(browser.getCurrentUrl()).not.toContain('index.php/apps/files/');
  });
  
  it('should be able to visit user management after admin login', function() {    
    loginPage.fillUserCredentilas(params.login.user, params.login.password);
    loginPage.loginButton.click();
    userPage = new UserPage(params.baseUrl);
    userPage.get();
    expect(browser.getCurrentUrl()).toEqual(userPage.url);
  });
  
});