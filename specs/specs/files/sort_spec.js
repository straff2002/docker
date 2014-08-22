var LoginPage = require('../pages/login.page.js');
var FilesPage = require('../pages/files.page.js');

describe('Sort', function() {
  var params = browser.params;
  var filesPage;
  
  beforeEach(function() {
    isAngularSite(false);
    filesPage = new FilesPage(params.baseUrl);
    filesPage.getAsUser(params.login.user, params.login.password);
  });

  it('shloud sort files by name', function() {
    expect(filesPage.firstListElem == element(by.css('#fileList tr[data-file="documents"]'))).toBeTruthy;
    filesPage.nameSortArrow.click();
    expect(filesPage.firstListElem == element(by.css('#fileList tr[data-file="ownCloudUserManual.pdf"]'))).toBeTruthy;
  });

  it('should sort files by size', function() {
    expect(filesPage.firstListElem == element(by.css('#fileList tr[data-file="documents"]'))).toBeTruthy;
    filesPage.sizeSortArrow.click();
    expect(filesPage.firstListElem == element(by.css('#fileList tr[data-file="music"]'))).toBeTruthy;
  });

  it('should sort files by modified date', function() {
    expect(filesPage.firstListElem == element(by.css('#fileList tr[data-file="documents"]'))).toBeTruthy;
    filesPage.createNewTxtFile('newText')
    filesPage.modifiedSortArrow.click();
    expect(filesPage.firstListElem == element(by.css('#fileList tr[data-file="newText.txt"]'))).toBeTruthy;
  });

});