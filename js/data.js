// data.js — модуль, который создает данные
'use strict';

(function () {
  var TITLES = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var ACCOMMODATION_TYPE = ['flat', 'house', 'bungalo'];
  var TIME = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ESC_KEYCODE = 27;
  window.ACCOMMODATION_TYPE = ACCOMMODATION_TYPE;
  window.TITLES = TITLES;
  window.TIME = TIME;
  window.FEATURES_LIST = FEATURES_LIST;
  window.ESC_KEYCODE = ESC_KEYCODE;


  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomElementsFromArray(array) {

    var length = getRandomNumber(1, array.length);
    var result = [];

    for (var i = 0; i < length; i++) {

      var value = getRandomElementFromArray(array);
      if (result.indexOf(value) === -1) {
        result.push(value);
      }
    }

    return result;
  }

  window.getRandomNumber = getRandomNumber;
  window.getRandomElementFromArray = getRandomElementFromArray;
  window.getRandomElementsFromArray = getRandomElementsFromArray;

  var infoBookings = [];
  for (var i = 0; i < TITLES.length; i++) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);
    var booking = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomElementFromArray(TITLES),
        address: (locationX - 28) + ', ' + (locationY + 75),
        price: getRandomNumber(1000, 1000000),
        type: getRandomElementFromArray(ACCOMMODATION_TYPE),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 20),
        checkin: getRandomElementFromArray(TIME),
        checkout: getRandomElementFromArray(TIME),
        features: getRandomElementsFromArray(FEATURES_LIST),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    infoBookings.push(booking);
  }

  window.infoBookings = infoBookings;

})();

