'use strict';

(function () {
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var synchronizeFields = function (field1, field2, array1, array2, callback) {
    field1.addEventListener('change', function () {
      var index = array1.indexOf(field1.value);
      callback(field2, array2[index]);
    });
  };

  window.synchronizeFields = synchronizeFields;

  window.synchronizeFields(apartmentType, pricePerNight, ['apartment', 'shack', 'palace'], [1000, 0, 10000], syncValueWithMin);
  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

})();
