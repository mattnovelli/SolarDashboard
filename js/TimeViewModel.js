/* indent: 2 */
var TimeViewModel = (function () {
  'use strict';
  return function Constructor () {
    var self = this;
    self.time = ko.observable(moment());
    self.formattedTime = ko.computed(function () { return self.time().format("h:mm:ss a"); });
  };
}());
