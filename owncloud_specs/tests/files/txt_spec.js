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

// ================== CREATE FILE ===================================== //

  it('should create a new txt file', function() {
    filesPage.createNewFile('text', 'testText');
    expect(filesPage.listFiles()).toContain('testText');
  });

// ================== ALREADY EXISTING NAME =========================== //

  it('should not create new file if filename already exists', function() {
    filesPage.fillNewForm('text', 'testText');
    var warning = by.css('.tipsy-inner');
    expect(element(warning).isDisplayed()).toBeTruthy();
  });

// ================== RENAME FILE ===================================== //

  it('should rename a txt file', function() {
    filesPage.renameFile('newText');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('newText');
  });

// ================== DELETE FILE ===================================== //

  it('should delete a txt file', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile(
      "tr[data-file='newText.txt']",
      "tr[data-file='newText.txt'] a.action.delete.delete-icon"
    );
    // Throwing error cause it is looking for index:5 but list has just 5 elements
    // .then(function() {
    //   expect(filesPage.listFiles()).not.toContain('newText.txt');
    // });

    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('newText.txt');
  });

  // it('should edit and save a txt file', function() {
  //   filesPage.editFile('testText.txt');
  //   filesPage.writeInFile('This is a test Text to test if one can edit and save a .txt file.');
  //   filesPage.saveFile();
  //   filesPage.get();
  //   filesPage.editFile('testText.txt');
  //   expect(filesPage.textArea.isDisplayed()).toBeTruthy();
  // });
});