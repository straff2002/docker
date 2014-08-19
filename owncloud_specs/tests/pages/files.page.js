(function() {  
  var LoginPage = require('../pages/login.page.js');

  var FilesPage = function(baseUrl) {
    this.baseUrl = baseUrl;
    this.path = 'index.php/apps/files';
    this.url = baseUrl + this.path;

    this.fileListId = by.css('td.filename .innernametext');

    this.newButton = element(by.css('#new a'));
    this.newTextButton = element(by.css('li.icon-filetype-text.svg'));
    this.newFolderButton = element(by.css('li.icon-filetype-folder.svg'));
    this.newTextnameForm = element(by.css('li.icon-filetype-text form input'));
    this.newFoldernameForm = element(by.css('li.icon-filetype-folder form input'));


    this.textArea = element(by.css('.ace_content'));
    this.textLine = element(by.css('.ace_content .ace_line'));
    this.saveButton = element(by.id('editor_save'));
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

  FilesPage.prototype.moveMouseTo = function(elem) {
    browser.actions().mouseMove($(elem)).perform();
  };

  FilesPage.prototype.fillNewForm = function(type, name) {
    this.newButton.click();
    switch(type) {
      case 'text':
        this.newTextButton.click();
        this.newTextnameForm.sendKeys(name); 
        this.newTextnameForm.sendKeys(protractor.Key.ENTER);  
        break;
      case 'folder':
        this.newFolderButton.click();
        this.newFoldernameForm.sendKeys(name); 
        this.newFoldernameForm.sendKeys(protractor.Key.ENTER);  
        break;
      default:
        console.log('wrong type');
    };
  }

  FilesPage.prototype.createNewFile = function(type, name) {
    this.fillNewForm(type, name);
    this.get();
  };

  FilesPage.prototype.renameFile = function(newName) {
    this.moveMouseTo("tr[data-file='testText.txt']");
    var renameId = by.css("tr[data-file='testText.txt'] a.action.action-rename");
    element(renameId).click();
    var renameForm = by.css("tr[data-file='testText.txt'] form input");
    element(renameForm).sendKeys(newName);
    element(renameForm).sendKeys(protractor.Key.ENTER);
  };

  FilesPage.prototype.renameFolder = function(newName) {
    this.moveMouseTo("tr[data-file='testFolder']");
    var renameId = by.css("tr[data-file='testFolder'] a.action.action-rename");
    element(renameId).click();
    var renameForm = by.css("tr[data-file='testFolder'] form input");
    element(renameForm).sendKeys(newName);
    element(renameForm).sendKeys(protractor.Key.ENTER);
  };

  // FilesPage.prototype.editFile = function(file) {
  //   var listElement = element(by.css("tr[data-file='testText.txt'] span.innernametext"));
  //   listElement.click();
  //   var textArea = this.textArea;
  //   browser.pause();
  //   browser.wait(function() {
  //     return(textArea.isDisplayed());
  //   }, 3000, 'load textEditPage');
  // };

  // FilesPage.prototype.writeInFile = function(text) {
  //   // this.textArea.click();
  //   this.textLine.sendKeys(text);
  // };

  // FilesPage.prototype.saveFile = function() {
  //   this.saveButton.click();
  // };

  FilesPage.prototype.deleteFile = function(elem1, elem2) {
    this.moveMouseTo(elem1);
    var removeId = by.css(elem2);
    return element(removeId).click();
  };


  FilesPage.prototype.listFiles = function() {
    return element.all(this.fileListId).map(function(filename) {
      return filename.getText();
    });
  };

  module.exports = FilesPage;
})();