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

  // ================== RESTORE FOLDER ===================================== //

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

    filesPage.restoreFile(0);
    filesPage.get();

    expect(filesPage.listFiles()).toContain('Empty');
    filesPage.deleteFile('Empty');
  });

  it('should restore a folder including special characters', function() {
    // create and delete empty folder
    filesPage.createNewFolder('Sp€c!@l FölD€r');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.deleteFile('Sp€c!@l FölD€r');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.trashbinButton.click();
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);

    filesPage.restoreFile(0);
    filesPage.get();

    expect(filesPage.listFiles()).toContain('Sp€c!@l FölD€r');
    filesPage.deleteFile('Sp€c!@l FölD€r');
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
    filesPage.restoreFile(0);
    filesPage.get();
    expect(filesPage.listFiles()).toContain('nonEmpty');
  });

  it('should restore a folder whose name is currently in use', function() {
    
    // create and delete non empty folder
    filesPage.createNewFolder('sameFolderName');
    filesPage.get();
    filesPage.deleteFile('sameFolderName');
    filesPage.get();
    filesPage.createNewFolder('sameFolderName');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.trashbinButton.click();
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.restoreFile(0);
    filesPage.get();
    expect(filesPage.listFiles()).toContain('sameFolderName (Wiederhergestellt)'); //for german ownclouds
    filesPage.deleteFile('sameFolderName');
    filesPage.deleteFile('sameFolderName (Wiederhergestellt)');
  });

  it('should restore a sub folder when the root folder has been deleted separately', function() {
    filesPage.goInToFolder('nonEmpty');
    filesPage.goInToFolder('Subfolder');
    browser.wait(function() {
      return(filesPage.newButton.isDisplayed());
    }, 3000);
    filesPage.createNewTxtFile('IsInSub');
    filesPage.getFolder('nonEmpty');
    filesPage.deleteFile('Subfolder');
    filesPage.get();
    filesPage.deleteFile('nonEmpty');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.trashbinButton.click();
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.restoreFile(1);
    filesPage.get();
    expect(filesPage.listFiles()).toContain('Subfolder');
  });

  // ================== RESTORE FILES ====================================== //

  it('should restore a file thas has been deleted', function() {
    filesPage.createNewTxtFile('restoreMe');
    filesPage.get();
    filesPage.deleteFile('restoreMe.txt');
    filesPage.get();
    filesPage.trashbinButton.click();
        browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.restoreFile(0);
    filesPage.get();
    expect(filesPage.listFiles()).toContain('restoreMe');
    filesPage.deleteFile('restoreMe.txt');
  });

  it('should restore a file including special characters', function() {
    filesPage.createNewTxtFile('Sp€c!@L RésTör€');
    filesPage.get();
    filesPage.deleteFile('Sp€c!@L RésTör€.txt');
    filesPage.get();
    filesPage.trashbinButton.click();
        browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.restoreFile(0);
    filesPage.get();
    expect(filesPage.listFiles()).toContain('Sp€c!@L RésTör€');
    filesPage.deleteFile('Sp€c!@L RésTör€.txt');
  });

  it('should restore a file whose name is currently in use', function() {
    
    // create and delete non empty folder
    filesPage.createNewTxtFile('sameFileName');
    filesPage.get();
    filesPage.deleteFile('sameFileName.txt');
    filesPage.get();
    filesPage.createNewTxtFile('sameFileName');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.trashbinButton.click();
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.restoreFile(0);
    filesPage.get();
    expect(filesPage.listFiles()).toContain('sameFileName (Wiederhergestellt)'); //for german ownclouds
    filesPage.deleteFile('sameFileName.txt');
    filesPage.deleteFile('sameFileName.txt (Wiederhergestellt)');
  });

});