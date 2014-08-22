var LoginPage = require('../pages/login.page.js');
var FilesPage = require('../pages/files.page.js');
var Screenshot = require('../helper/screenshot.js');

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
    filesPage.createNewTxtFile('testText');
    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).toContain('testText');
  });

// ================== ALREADY EXISTING NAME =========================== //

  it('should not create new file if filename already exists', function() {
    filesPage.createNewTxtFile('testText');
    expect(filesPage.alertWarning.isDisplayed()).toBeTruthy();
  });

// ================== RENAME FILES ==================================== //

  it('should rename a txt file', function() {
    filesPage.renameFile('testText.txt', 'newText');
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    expect(filesPage.listFiles()).toContain('newText');
  });

  it('should show alert message if name is already in use', function() {
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

// ================== DELETE FILE ===================================== //

  it('should delete a txt file', function() {
    browser.wait(function() {
      return(filesPage.listFiles());
    }, 3000);
    filesPage.deleteFile('newText.txt');
    filesPage.deleteFile('sP€c!@L B-).txt');
    filesPage.deleteFile('Without Subfix');
    // Throwing error cause it is looking for index:5 but list has just 5 elements
    // .then(function() {
    //   expect(filesPage.listFiles()).not.toContain('newText.txt');
    // });

    filesPage.get(); // reload to get filesPage.listFiles() ready
    expect(filesPage.listFiles()).not.toContain('sP€c!@L B-)', 'newText', 'Without Subfix')
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