(function() {  
  var FirstRunWizardPage = function(baseUrl) {    
    this.firstRunWizardId = by.id('firstrunwizard');
    this.firstRunWizard = element(this.firstRunWizardId);      
    this.closeLink = element(by.id('cboxOverlay'));
  };
  
  FirstRunWizardPage.prototype.waitForFirstRunWizard = function() {
    browser.wait(function() {
      return by.id('closeWizard');
      // return by.id('firstrunwizard');
    }, 8000);
  };
  
  FirstRunWizardPage.prototype.isFirstRunWizardPage = function() {
    this.waitForFirstRunWizard();
    return !!this.firstRunWizardId;
  };
  
  FirstRunWizardPage.prototype.close = function() {
    browser.executeScript('$("#closeWizard").click();');
    browser.executeScript('$("#cboxOverlay").click();');
    browser.wait(function () {
        return element(by.id('cboxOverlay')).isDisplayed().then(function(displayed) {
          return !displayed; // Do a little Promise/Boolean dance here, since wait will resolve promises.
        });
      }, 3000, 'firstrunwizard should dissappear');
  };
  
  module.exports = FirstRunWizardPage;
})();