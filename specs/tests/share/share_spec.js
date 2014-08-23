var LoginPage = require('../pages/login.page.js');
var UserPage = require('../pages/user.page.js');
var FilesPage = require('../pages/files.page.js');
var FirstRunWizardPage = require('../pages/firstRunWizard.page.js');


describe('Share', function() {
  var params = browser.params;
  var loginPage;
  var userPage
  var filesPage;
  var firstRunWizardPage;

  beforeEach(function() {
    isAngularSite(false);
    loginPage = new LoginPage(params.baseUrl);
    userPage = new UserPage(params.baseUrl);
    filesPage = new FilesPage(params.baseUrl);
    firstRunWizardPage = new FirstRunWizardPage(params.baseUrl);
    filesPage.getAsUser(params.login.user, params.login.password);
  });

  it('should login as admin and create 4 new users in 2 groups', function() {
    userPage.get();
    userPage.createNewGroup('test_specGroup_1');
    userPage.get();
    userPage.createNewGroup('test_specGroup_2');
    userPage.createNewUser('demo', 'password');
    userPage.get();
    userPage.createNewUser('demo2', 'password');
    userPage.get();
    userPage.renameDisplayName('demo2', ' display2');
    // setting Group to User fails cause click receives an other element
    // userPage.setUserGroup('demo2', 'test_specGroup_1');
    userPage.createNewUser('demo3', 'password');
    userPage.get();
    userPage.renameDisplayName('demo3', ' display3');
      // setting Group to User fails cause click receives an other element
    // userPage.setUserGroup('demo3', 'test_specGroup_1');
    userPage.createNewUser('demo4', 'password');
    userPage.get();
    userPage.renameDisplayName('demo4', ' display4');
      // setting Group to User fails cause click receives an other element
    // userPage.setUserGroup('demo4', 'test_specGroup_2');
    userPage.get();
    expect(userPage.listUser()).toContain('demo', 'demo2', 'demo3', 'demo4');
  });


  xit('should share a folder with another user by username', function() {
    filesPage.createNewFolder('toShare');
    filesPage.get();
    filesPage.openShareForm('toShare');
    filesPage.shareWithForm.sendKeys('demo');
    browser.wait(function(){
      return filesPage.sharedWithDropdown.isDisplayed();
    }, 5000);
    filesPage.shareWithForm.sendKeys(protractor.Key.ENTER);

    loginPage.logout();
    loginPage.login('demo', 'password');
    firstRunWizardPage.waitForDisplay();
    firstRunWizardPage.close();
    filesPage.get();
    expect(filesPage.listFiles()).toContain('toShare');
  });

  xit('should share a folder with 3 another user by display name', function() {
    filesPage.openShareForm('toShare');
    filesPage.shareWithForm.sendKeys('display2');
    browser.wait(function(){
      return filesPage.sharedWithDropdown.isDisplayed();
    }, 3000);
    filesPage.shareWithForm.sendKeys(protractor.Key.ENTER);

    filesPage.shareWithForm.sendKeys(protractor.Key.DELETE);
    filesPage.shareWithForm.sendKeys('display3');
    browser.wait(function(){
      return filesPage.sharedWithDropdown.isDisplayed();
    }, 3000);
    filesPage.shareWithForm.sendKeys(protractor.Key.ENTER);

    filesPage.shareWithForm.sendKeys(protractor.Key.DELETE);
    filesPage.shareWithForm.sendKeys('display4');
    browser.wait(function(){
      return filesPage.sharedWithDropdown.isDisplayed();
    }, 3000);
    filesPage.shareWithForm.sendKeys(protractor.Key.ENTER);

    loginPage.logout();
    loginPage.login('demo2', 'password');
    var button = filesPage.newButton;
    browser.wait(function() {
      return button.isDisplayed();
    }, 5000, 'load files content');
    expect(filesPage.listFiles()).toContain('toShare');

    loginPage.logout();
    loginPage.login('demo3', 'password');
    var button = filesPage.newButton;
    browser.wait(function() {
      return button.isDisplayed();
    }, 5000, 'load files content');
    expect(filesPage.listFiles()).toContain('toShare');

    loginPage.logout();
    loginPage.login('demo4', 'password');
    var button = filesPage.newButton;
    browser.wait(function() {
      return button.isDisplayed();
    }, 5000, 'load files content');
    expect(filesPage.listFiles()).toContain('toShare');
  });

  

});