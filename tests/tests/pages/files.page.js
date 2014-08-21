(function() {  
  var LoginPage = require('../pages/login.page.js');

  var FilesPage = function(baseUrl) {
    this.baseUrl = baseUrl;
    this.path = 'index.php/apps/files';
    this.url = baseUrl + this.path;

    var url = this.url
    this.folderUrl = function(folder) {
      return url+'/?dir=%2F'+folder
    }

    this.fileListId = by.css('td.filename .innernametext');

    this.firstListElem = element(by.css('#fileList tr[data-id="0"]'));

    this.newButton = element(by.css('#new a'));
    this.newTextButton = element(by.css('li.icon-filetype-text.svg'));
    this.newFolderButton = element(by.css('li.icon-filetype-folder.svg'));
    this.newTextnameForm = element(by.css('li.icon-filetype-text form input'));
    this.newFoldernameForm = element(by.css('li.icon-filetype-folder form input'));

    this.alertWarning = element(by.css('.tipsy-inner'));

    this.trashbinButton = element(by.css('#app-navigation li.nav-trashbin a'));

    // this.textArea = element(by.css('.ace_content'));
    // this.textLine = element(by.css('.ace_content .ace_line'));
    // this.saveButton = element(by.id('editor_save'));
  };

//================ SHARED ===============================================//
 
  FilesPage.prototype.get = function() { 
    browser.get(this.url);
    var button = this.newButton;
    browser.wait(function() {
      return button.isDisplayed();
    }, 5000, 'load files content');
  };

  FilesPage.prototype.getFolder = function(folder) {
    folderUrl = this.folderUrl(folder);
    browser.get(folderUrl);
  }

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

  FilesPage.prototype.listFiles = function() {
    return element.all(this.fileListId).map(function(filename) {
      return filename.getText();
    });
  };

//================ SHARED ACTIONS ========================================//

  FilesPage.prototype.openRenameForm = function(name) {
    this.moveMouseTo("tr[data-file='"+name+"']");
    var renameId = by.css("tr[data-file='"+name+"'] a.action.action-rename");
    element(renameId).click();
  };

  FilesPage.prototype.renameFile = function(name, newName) {
    this.openRenameForm(name);
    var renameForm = by.css("tr[data-file='"+name+"'] form input");
    element(renameForm).sendKeys(newName);
    element(renameForm).sendKeys(protractor.Key.ENTER);
  };

  FilesPage.prototype.emptyRenameFile = function(name) {
    this.openRenameForm(name);
    var renameForm = by.css("tr[data-file='"+name+"'] form input");
    for(var i=0; i<5; i++) {
      element(renameForm).sendKeys(protractor.Key.DELETE)
    };
    element(renameForm).sendKeys(protractor.Key.ENTER);
  };

  FilesPage.prototype.takeOffSubfix = function(name, newName) {
    this.openRenameForm(name);
    var renameForm = by.css("tr[data-file='"+name+"'] form input");
    element(renameForm).sendKeys(newName);
    for(var i=0; i<5; i++) {
      element(renameForm).sendKeys(protractor.Key.DELETE)
    };
    element(renameForm).sendKeys(protractor.Key.ENTER);
  }

  FilesPage.prototype.deleteFile = function(name) {
    this.moveMouseTo("tr[data-file='"+name+"']");
    var removeId = by.css("tr[data-file='"+name+"'] a.action.delete.delete-icon");
    return element(removeId).click();
  };

  FilesPage.prototype.restoreFile = function(id) {
    this.moveMouseTo("#fileList tr[data-id='"+id+"']");
    var restoreId = (by.css("#fileList tr[data-id='"+id+"'] a.action.action-restore"));
    return element(restoreId).click(0);
  };

//================ TXT FILES ============================================//

  FilesPage.prototype.createNewTxtFile = function(name) {
    this.newButton.click()
    this.newTextButton.click();
    this.newTextnameForm.sendKeys(name); 
    this.newTextnameForm.sendKeys(protractor.Key.ENTER);  
  };

//================ FOLDERS ==============================================//

  FilesPage.prototype.createNewFolder = function(name) {
    this.newButton.click()
    this.newFolderButton.click();
    this.newFoldernameForm.sendKeys(name); 
    this.newFoldernameForm.sendKeys(protractor.Key.ENTER);  
  };

  FilesPage.prototype.goInToFolder = function(name) {
    this.moveMouseTo("tr[data-file='"+name+"']");
    var folder = element(by.css("tr[data-file='"+name+"'] span.innernametext"));
    folder.click();
    var button = this.newButton;
    browser.wait(function() {
      return button.isDisplayed();
    }, 5000, 'load files content');
  };

  FilesPage.prototype.createSubFolder = function(folderName, subFolderName) {
    this.goInToFolder(folderName);
    this.createNewFolder(subFolderName);
  };

//================ NOT WORKING STUFF ====================================//

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


  module.exports = FilesPage;
})();