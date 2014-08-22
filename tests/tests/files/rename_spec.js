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

  // ================== RENAME FOLDER ===================================== //

  it('should rename a folder', function() {
    filesPage.createNewFolder('testFolder');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.renameFile('testFolder', 'newFolder');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('newFolder');
  });

  it('should show alert message if foldername already in use', function() {
    filesPage.createNewFolder('testFolder');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.renameFile('testFolder', 'newFolder');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.alertWarning.isDisplayed()).toBeTruthy();
  });

  it('should show alert message if using forbidden characters', function() {
    filesPage.renameFile('testFolder', 'new:Folder');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.alertWarning.isDisplayed()).toBeTruthy();
  });

  it('should rename a file using special characters', function() {
    filesPage.renameFile('testFolder', 'sP€c!@L B-)');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('sP€c!@L B-)');
  });

  it('should show alert message if newName is empty', function() {
    filesPage.emptyRenameFile('newFolder');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.alertWarning.isDisplayed()).toBeTruthy();
  });

  it('should delete a folder', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('newFolder');
    filesPage.deleteFile('sP€c!@L B-)');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('newFolder', 'sP€c!@L B-)');
  });

  // ================== RENAME FILES ==================================== //

  it('should rename a txt file', function() {
    filesPage.createNewTxtFile('testText');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.renameFile('testText.txt', 'newText');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('newText');
  });

  it('should show alert message if filename is already in use', function() {
    filesPage.createNewTxtFile('testText');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    filesPage.renameFile('testText.txt', 'newText');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.alertWarning.isDisplayed()).toBeTruthy();
  });

  it('should rename a file with the same name but changed capitalization', function() {
    browser.takeScreenshot().then(function (png) {
      
      new Screenshot(png, 'SameNameCapitalization1.png');
    filesPage.renameFile('testText.txt', 'NewText');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    });
    browser.takeScreenshot().then(function (png) {
        new Screenshot(png, 'SameNameCapitalization2.png');
    });
    expect(filesPage.listFiles()).toContain('NewText');
  });

  it('should rename a file using special characters', function() {
    filesPage.renameFile('testText.txt', 'sP€c!@L B-)');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('sP€c!@L B-)');
  });

  it('should show alert message if newName is empty', function() {
    filesPage.createNewTxtFile('thirdText');
    filesPage.get();
    filesPage.emptyRenameFile('thirdText.txt');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.alertWarning.isDisplayed()).toBeTruthy();
  });

  it('should rename a file by taking off the file extension', function() {
    filesPage.takeOffSubfix('thirdText.txt', 'Without Subfix');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('Without Subfix');
  });

  it('should delete a txt file', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('Without Subfix');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('sP€c!@L B-)', 'newText', 'Without Subfix')
  });

});