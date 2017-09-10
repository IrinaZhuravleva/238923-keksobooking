'use strict';
(function () {

  var onSuccess = function (data) {
    window.data = data;
    window.pins.draw(data);
    window.map.draw(data);
  };

  var onError = function () {
  };

  window.backend.load(onSuccess, onError);

})();

