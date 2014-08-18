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

  it('create a new txt file', function() {
    filesPage.createNewTextFile('testText');
    expect(filesPage.listFiles()).toContain('testText');
  });

  it('delete a txt file', function() {
    filesPage.deleteFile('testText.txt');
    expect(filesPage.listFiles()).not.toContain('testText.txt');
  });

});