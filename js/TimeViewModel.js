const timeUpdateIntervalSeconds = 10;
const timeSyncIntervalMinutes = 10;
/* indent: 2 */
const TimeViewModel = (function () {
	'use strict';
	return function Constructor() {
		var self = this;
		self.time = ko.observable(moment());
		self.formattedTime = ko.computed(function () { return self.time().format("h:mm"); });
		self.ampm = ko.computed(function () { return self.time().format("a"); })

		self.fetch = function () {
			$.ajax({
				url: 'https://mtdweb.mtd.org/api/time',
				dataType: 'JSON',
				contentType: 'text/plain',
				xhrFields: {
					withCredentials: false
				}
			}).then(function (data) {
				self.time(moment(data));
			});
		};

		window.setInterval(function () {
			self.time(self.time().add(timeUpdateIntervalSeconds, 'seconds'));
		}, timeUpdateIntervalSeconds * 1000);

		window.setInterval(self.fetch, timeSyncIntervalMinutes * 60 * 1000);
		self.fetch();

	};
}());
