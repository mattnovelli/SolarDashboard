/* indent: 2 */
var WeatherViewModel = (function () {
	'use strict';
	return function Constructor() {

		var self = this;

		self.temp = ko.observable('N/A');
		self.forecast = ko.observable('N/A');
		self.unavailable = ko.computed(function () { return self.temp() === 'N/A' || self.forecast() === 'N/A'; });

		self.fetch = function () {
			$.ajax({
				url: 'https://api.pirateweather.net/forecast/QGeQWdlChULeGtPZ/40.11540485198756,-88.19528513297648?exclude=minutely,hourly,daily,alerts',
				dataType: 'JSON',
				contentType: 'text/plain',
				xhrFields: {
					withCredentials: false
				}
			}).then(function (data) {
				console.log('weather', data);
				self.temp(Math.floor(data.currently.temperature));
				self.forecast(data.currently.summary.toLowerCase());
				if (self.unavailable()) {
					window.setTimeout(self.fetch, 15000);
				}
			}, function (error) {
				console.warn('weather error', error);
				self.temp('N/A');
				self.forecast = 'N/A';
			});
		};

		window.setInterval(self.fetch, 1200000); // 20 minutes
		self.fetch();

	};
}());
