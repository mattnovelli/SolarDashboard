/* indent: 2 */
var TimeViewModel = (function () {
  'use strict';
  return function Constructor () {
    var self = this;
    self.time = ko.observable(moment());
    self.formattedTime = ko.computed(function () { return self.time().format("h:mm:ss a"); });

    self.fetch = function () {
      $.ajax({
        url: 'http://dev.mtdweb.cumtd.com/api/time',
        dataType: 'JSON',
        contentType: 'text/plain',
        xhrFields: {
          withCredentials: false
        }
      }).then(function (data) {
        self.time(moment(data));
      });
    };

    window.setInterval(function() {
      self.time(self.time().add(1, 'seconds'));
    }, 1000);

    window.setInterval(self.fetch, 600000); // 10 minutes
    self.fetch();

  };
}());
