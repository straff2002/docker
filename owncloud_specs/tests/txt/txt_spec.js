var LoginPage = require('../pages/login.page.js');
var FilesPage = require('../pages/files.page.js');

describe('Txt Files', function() {
  var params = browser.params;
  var filesPage;
  
  beforeEach(function() {
    isAngularSite(false);
    filesPage = new FilesPage(params.baseUrl);
    filesPage.getAsUser(params.login.user, params.login.password);
  });

  it('should create a new txt file', function() {
    filesPage.createNewTextFile('testText');
    expect(filesPage.listFiles()).toContain('testText');
  });

  // it('should edit and save a txt file', function() {
  //   filesPage.editFile('testText.txt');
  //   filesPage.writeInFile('This is a test Text to test if one can edit and save a .txt file.');
  //   filesPage.saveFile();
  //   filesPage.get();
  //   filesPage.editFile('testText.txt');
  //   expect(filesPage.textArea.isDisplayed()).toBeTruthy();
  // });

  it('should rename a txt file', function() {
    filesPage.renameFile('newText');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('newText');
  });

  it('should delete a txt file', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('newText.txt');
    expect(filesPage.listFiles()).not.toContain('newText.txt');
  });

});