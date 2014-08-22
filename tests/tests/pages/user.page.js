(function() {  
  var UserPage = function(baseUrl) {
    this.baseUrl = baseUrl;
    this.path = 'index.php/settings/users';
    this.url = baseUrl + this.path;
    
    this.newUserNameInput = element(by.id('newusername'));
    this.newUserPasswordInput = element(by.id('newuserpassword'));
    this.createNewUserButton = element(by.css('#newuser input[type="submit"]')); 
  };

  UserPage.prototype.get = function() {
    browser.get(this.url);
  };
  
  UserPage.prototype.isUserPage = function() {
    return browser.driver.getCurrentUrl() == this.url;
  };
  
  UserPage.prototype.ensureUserPage = function() {
    // console.log(this.isUserPage());
    // if (! this.isUserPage()) {
    //   display.log('Warning: Auto loading UserPage');
    //   this.get();
    // }
  };
  
  UserPage.prototype.fillNewUserInput = function(user, pass) {
    this.ensureUserPage();
    this.newUserNameInput.sendKeys(user);
    this.newUserPasswordInput.sendKeys(pass);
  };
  
  UserPage.prototype.createNewUser = function(user, pass) {
    this.ensureUserPage();
    this.fillNewUserInput(user, pass);
    this.createNewUserButton.click();
  };
  
  UserPage.prototype.deleteUser = function(user) {
    this.ensureUserPage();
    
    var removeId = by.css('#userlist tr[data-displayname="' + user + '"] td.remove a');
    var filter = browser.findElement(removeId);
    var scrollIntoView = function () {
      arguments[0].scrollIntoView();
    }
    browser.executeScript(scrollIntoView, filter).then(function () {
      browser.actions().mouseMove(browser.findElement(removeId)).perform();
      element(removeId).click();
    });
  };
  
  UserPage.prototype.listUser = function() {
    this.ensureUserPage();
    return element.all(by.css('td.displayName')).map(function(user) {
      return user.getText();
    });
  };
  
  module.exports = UserPage;
})();