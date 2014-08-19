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
    filesPage.createNewFile('folder', 'testFolder');
    expect(filesPage.listFiles()).toContain('testFolder');
  });

  // ================== RENAME FOLDER ===================================== //

  it('should rename a folder', function() {
    filesPage.renameFolder('newFolder');
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
    filesPage.deleteFile(
      "tr[data-file='newFolder']",
      "tr[data-file='newFolder'] a.action.delete.delete-icon"
    );
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('newFolder');
  });

});