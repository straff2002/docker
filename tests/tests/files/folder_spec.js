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
    expect(filesPage.alertWarning.isDisplayed()).toBeTruthy();
  });

  // ================== DELETE FOLDER ===================================== //

  it('should delete a folder', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('testFolder');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('testFolder');
  });

  // ================== SUB FOLDER ======================================== //

  it('should go into folder and create subfolder', function() {
    var folder = 'hasSubFolder';
    filesPage.createNewFolder(folder);
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.goInToFolder(folder);
    //filesPage.getFolder(folder)// reload to get filesPage.listFiles() ready
    filesPage.createNewFolder('SubFolder');
    filesPage.createNewFolder('SubFolder2');
    expect(filesPage.listFiles()).toContain('SubFolder', 'SubFolder2');
  });  

  it('should rename a subfolder', function() {
    filesPage.goInToFolder('hasSubFolder');
    filesPage.renameFile('SubFolder2', 'NewSubFolder');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('NewSubFolder');
  });

  it('should delete a subfolder', function() {
    filesPage.goInToFolder('hasSubFolder');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('SubFolder');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('SubFolder');
  });

  it('should delete a folder containing a subfolder', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('hasSubFolder');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('hasSubFolder');
  });

});