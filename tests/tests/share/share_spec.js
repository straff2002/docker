var LoginPage = require('../pages/login.page.js');
var UserPage = require('../pages/user.page.js');
var FilesPage = require('../pages/files.page.js');
var FirstRunWizardPage = require('../pages/firstRunWizard.page.js')


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

  xit('should login as admin and create a new user', function() {
    userPage.get();
    userPage.createNewUser('demo', 'password');
    userPage.get();
    expect(userPage.listUser()).toContain('demo');
  });

  it('should share a folder with another user by username', function() {
    filesPage.createNewFolder('toShare');
    filesPage.get();
    filesPage.openShareForm('toShare');
    filesPage.shareWithForm.sendKeys('demo');
    browser.wait(function(){
      return filesPage.sharedWithDropdwon.isDisplayed();
    }, 3000);
    filesPage.shareWithForm.sendKeys(protractor.Key.ENTER);

    loginPage.logout();
    loginPage.login('demo', 'password');
    firstRunWizardPage.waitForDisplay();
    firstRunWizardPage.close();
    filesPage.setCurrentListElem('toShare');
    browser.wait(function() {
      return filesPage.listFiles();
    },3000);
    expect(filesPage.listFiles()).toContain('toShare');
  });

});