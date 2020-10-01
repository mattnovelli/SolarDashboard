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
				url: 'https://mtdweb.mtd.org/api/weather/current',
				dataType: 'JSON',
				contentType: 'text/plain',
				xhrFields: {
					withCredentials: false
				}
			}).then(function (data) {
				console.log('weather', data);
				self.temp(data.Temperature);
				self.forecast(data.Conditions.toLowerCase());
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
