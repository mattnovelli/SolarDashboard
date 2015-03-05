/* indent: 2 */
var WeatherViewModel = (function () {
  'use strict';
  return function Constructor () {

    var self = this;

    self.temp = ko.observable('N/A');
    self.forcast = ko.observable('N/A');
    self.unavailable = ko.computed(function () { return self.temp() === 'N/A' || self.forcast() === 'N/A'; });

    self.fetch = function () {
      $.ajax({
        url: 'http://dev.mtdweb.cumtd.com/api/weather/current',
        dataType: 'JSON',
        contentType: 'text/plain',
        xhrFields: {
          withCredentials: false
        }
      }).then(function (data) {
        self.temp(data.Temperature);
        self.forcast(data.Conditions);

        if (self.unavailable()) {
          window.setTimeout(self.fetch, 15000);
        }

      }, function () {
        self.temp('N/A');
        self.forcast = 'N/A';
      });
    };

    window.setInterval(self.fetch(), 1200000); // 20 minutes
    self.fetch();

  };
}());
