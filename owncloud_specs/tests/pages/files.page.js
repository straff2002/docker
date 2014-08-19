(function() {  
  var LoginPage = require('../pages/login.page.js');

  var FilesPage = function(baseUrl) {
    this.baseUrl = baseUrl;
    this.path = 'index.php/apps/files';
    this.url = baseUrl + this.path;

    this.fileListId = by.css('td.filename .innernametext');

    this.newButton = element(by.css('#new a'));
    this.newTextButton = element(by.css('li.icon-filetype-text.svg'));
    this.newTextnameForm = element(by.css('li.icon-filetype-text form input')); 
  };
  
  FilesPage.prototype.get = function() { 
    browser.get(this.url);
    var button = this.newButton;
    browser.wait(function() {
      return button.isDisplayed();
    }, 5000, 'load files content');
  };

  FilesPage.prototype.getAsUser = function(name, pass) { 
    var loginPage;
    loginPage = new LoginPage(this.baseUrl);
    browser.manage().deleteAllCookies(); // logout the hard way
    loginPage.get();
    loginPage.login(name, pass);
    this.get();
  };

  FilesPage.prototype.createNewTextFile = function(name) {
    this.newButton.click();
    this.newTextButton.click();
    this.newTextnameForm.sendKeys(name);
    this.newTextnameForm.sendKeys(protractor.Key.ENTER);  
    this.get();
  };

  FilesPage.prototype.deleteFile = function(file) {

    browser.actions().mouseMove($("tr[data-file='testText.txt']")).perform();
    var removeId = by.css("tr[data-file='testText.txt'] a.action.delete.delete-icon");
    element(removeId).click();
    this.get();
  };


  FilesPage.prototype.listFiles = function() {
    return element.all(this.fileListId).map(function(filename) {
      return filename.getText();
    });
  };

  module.exports = FilesPage;
})();