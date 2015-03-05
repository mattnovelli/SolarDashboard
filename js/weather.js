'use strict';

var WeatherViewModel = (function() {
  var Constructor = function() {

    var _this = this;

    _this.temp = ko.observable('N/A');
    _this.forcast = ko.observable('N/A');
    _this.unavailable = ko.computed(function() { return _this.temp() === 'N/A' || _this.forcast() === 'N/A'; });

    _this.fetch = function() {
      $.ajax({
        url: 'http://dev.mtdweb.cumtd.com/api/weather/current',
        dataType: 'JSON',
        contentType: 'text/plain',
        xhrFields: {
          withCredentials: false
        }
      }).then(function(data) {
        _this.temp(data.Temperature);
        _this.forcast(data.Conditions);

        if (_this.unavailable()) {
          window.setTimeout(_this.fetch, 15000);
        }

      }, function() {
        _this.temp('N/A');
        _this.forcast = 'N/A';
      });
    };

    window.setInterval(_this.fetch(), 600000); // ten minutes
    _this.fetch();

  };
  return Constructor;
})();
