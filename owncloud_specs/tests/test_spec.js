describe('homepage', function() {
  beforeEach(function() {
    // before function
    isAngularSite(false);
    // browser.get('http://127.0.0.1/');
    browser.get("http://127.0.0.1/ownClouds/release-community-7.0.1/");
  });


  var fs = require('fs');

  // ... other code

  // abstract writing screen shot to a file
  function writeScreenShot(data, filename) {
      var stream = fs.createWriteStream(filename);

      stream.write(new Buffer(data, 'base64'));
      stream.end();
  }

  it('should load the page', function() {
    // test goes here
    
    browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'owncloud.png');
    });
    
    expect(element(by.css('.logo'))).toBeDefined();
  });
  
  
  it('should install as admin', function() {
    var user_input = element(by.id('adminlogin'));
    user_input.sendKeys("felix");
    
    var password_input = element(by.id('adminpass'));
    password_input.sendKeys("password");
    
    
    browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'login.png');
    });
    
    expect(element(by.css('.logo'))).toBeDefined();
  });
  
  
  
  it('should login', function() {
    var user_input = element(by.id('user'));
    user_input.sendKeys("felix");
    
    var password_input = element(by.id('password'));
    password_input.sendKeys("password");
    
    
    browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'login.png');
    });
    
    expect(element(by.css('.logo'))).toBeDefined();
  });
});