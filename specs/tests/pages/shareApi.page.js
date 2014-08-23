(function() { 
  var request = require('request');
  var parseString = require('xml2js').parseString;

  var ShareApi = function(baseUrl) {
    this.baseUrl = baseUrl;
    this.path = 'ocs/v1.php/apps/files_sharing/api/v1/shares';
    this.url = baseUrl + this.path;

    this.request = {
      method: "GET"
    };
  };

  ShareApi.prototype.http = function (method) {
    var url = this.url;
    var method = method;
    console.log(this);

    var defer = protractor.promise.defer();
    console.log("Calling", this.url);

    request({
      uri: url,
      method: method,
      followRedirect: true,
      auth: {
        user: "admin", 
        password: "password",
      }
    },
    function(error, response) {
      console.log("Done call to", url, "status:", response.statusCode);
      if (error || response.statusCode >= 400) {
          defer.reject({
              error : error,
              response : response
          });
      } else {
          defer.fulfill(response);
      }
    });
    return defer.promise;
  };

  module.exports = ShareApi;
})();



