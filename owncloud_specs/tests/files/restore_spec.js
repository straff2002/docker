var LoginPage = require('../pages/login.page.js');
var FilesPage = require('../pages/files.page.js');

describe('Rename', function() {
  var params = browser.params;
  var filesPage;
  
  beforeEach(function() {
    isAngularSite(false);
    filesPage = new FilesPage(params.baseUrl);
    filesPage.getAsUser(params.login.user, params.login.password);
  });

  it('should restore a emtpy folder that has been deleted', function() {
    // create and delete empty folder
    filesPage.createNewFolder('Empty');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.deleteFile('Empty');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.trashbinButton.click();
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);

    // restore non empty folder
    filesPage.restoreFile(0);
    filesPage.get();

    expect(filesPage.listFiles()).toContain('Empty');
    filesPage.deleteFile('Empty');
  });

  it('should restore a non empty folder that has been deleted', function() {
    
    // create and delete non empty folder
    filesPage.createNewFolder('nonEmpty');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.createSubFolder('nonEmpty', 'Subfolder');
    filesPage.createNewTxtFile('TextFile');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.deleteFile('nonEmpty');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.trashbinButton.click();
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);

    // restore non empty folder
    filesPage.restoreFile(0);
    filesPage.get();

    expect(filesPage.listFiles()).toContain('nonEmpty');
    filesPage.deleteFile('nonEmpty');
  });


});