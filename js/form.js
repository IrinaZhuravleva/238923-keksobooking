// form.js — модуль, который работает с формой объявления
'use strict';

(function () {
  var timeOut = document.getElementById('timeout');
  window.timeOut = timeOut;
  var capacity = document.getElementById('capacity');
  var address = document.getElementById('address');
  var title = document.getElementById('title');
  var type = document.getElementById('type');
  var price = document.getElementById('price');
  type.addEventListener('change', function (event) {
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

})();
