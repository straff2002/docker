// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,
  chromeDriver: './node_modules/protractor/selenium/chromedriver',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  // specs: ['example_spec.js'],
  specs: ['specs/**/*_spec.js'],
  
  suites: {
    homepage: 'specs/homepage/**/*Spec.js',
    search: [
      'specs/search/**/*Spec.js',
      'specs/user_search/**/*Spec.js'
    ]
  },

  // seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  
  onPrepare: function(){
    global.isAngularSite = function(flag){
      browser.ignoreSynchronization = !flag;
    };
  }
};
