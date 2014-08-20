var LoginPage = require('../pages/login.page.js');
var FilesPage = require('../pages/files.page.js');

describe('Folders', function() {
  var params = browser.params;
  var filesPage;
  
  beforeEach(function() {
    isAngularSite(false);
    filesPage = new FilesPage(params.baseUrl);
    filesPage.getAsUser(params.login.user, params.login.password);
  });

  // ================== CREATE FOLDER ===================================== //

  it('should create a new folder', function() {
    filesPage.createNewFolder('testFolder');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).toContain('testFolder');
  });

// ================== ALREADY EXISTING FOLDER =========================== //

  it('should not create new folder if foldername already exists', function() {
    filesPage.createNewFolder('testFolder');
    var warning = by.css('.tipsy-inner');
    expect(element(warning).isDisplayed()).toBeTruthy();
  });

  // ================== RENAME FOLDER ===================================== //

  it('should rename a folder', function() {
    filesPage.renameFile('testFolder', 'newFolder');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('newFolder');
  });

  // ================== DELETE FOLDER ===================================== //

  it('should delete a folder', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('newFolder');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('newFolder');
  });

});