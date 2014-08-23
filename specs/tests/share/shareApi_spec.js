var ShareApi = require('../pages/shareApi.page.js');
var LoginPage = require('../pages/login.page.js');
var UserPage = require('../pages/user.page.js');
var FilesPage = require('../pages/files.page.js');
var FirstRunWizardPage = require('../pages/firstRunWizard.page.js');
var parseXml = require('xml2js').parseString;

var flow = protractor.promise.controlFlow();

describe('Share Api', function() {
  var params = browser.params;
  var shareApi;
  var loginPage;
  var userPage
  var filesPage;
  var firstRunWizardPage;


  beforeEach(function() {
    isAngularSite(false);
    shareApi = new ShareApi(params.baseUrl);
    // loginPage = new LoginPage(params.baseUrl);
    // userPage = new UserPage(params.baseUrl);
    // filesPage = new FilesPage(params.baseUrl);
    // firstRunWizardPage = new FirstRunWizardPage(params.baseUrl);
    // filesPage.getAsUser(params.login.user, params.login.password);
  });

  it('should create a new share', function() {
    var get = function () {
      return shareApi.http("GET");
    };

    flow.execute(get).then(function(res){
      parseXml(res.body, function (err, result) {
        // console.dir(result);
        console.dir(result.ocs.data);
      });
      expect(res.statusCode).toEqual(200);
    });
    
  });


});