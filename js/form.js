// form.js — модуль, который работает с формой объявления
'use strict';

(function () {
  var timeOut = document.getElementById('timeout');
  window.timeOut = timeOut;
  // var capacity = document.getElementById('capacity');
  var address = document.getElementById('address');
  var title = document.getElementById('title');
  var type = document.getElementById('type');
  var price = document.getElementById('price');
  type.addEventListener('change', function () {
    if (type.value === 'bungalo') {
      price.value = '0';
    } else if (type.value === 'flat') {
      price.value = '1000';
    } else if (type.value === 'house') {
      price.value = '5000';
    } else {
      price.value = '10000';
    }
  });


  address.addEventListener('invalid', function () {
    if (!address.validity.valid) {
      address.style.border = 'thick solid red';
    } else {
      address.setCustomValidity('');
    }
  });

  title.addEventListener('invalid', function () {
    if (!title.validity.valid) {
      title.style.border = 'thick solid red';
    } else {
      title.setCustomValidity('');
    }
  });

  price.addEventListener('invalid', function () {
    if (!price.validity.valid) {
      price.style.border = 'thick solid red';
    } else {
      price.setCustomValidity('');
    }
  });

  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(apartmentType, pricePerNight, ['apartment', 'shack', 'palace'], [1000, 0, 10000], syncValueWithMin);
  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

})();
