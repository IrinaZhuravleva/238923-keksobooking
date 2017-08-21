'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ACCOMMODATION_TYPE = ['flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var featuresNewArray = [];
// featuresNewArray.length = Math.floor(Math.random() * (FEATURES_LIST.length - 1 + 1)) + 1;
// for (i = 0; i < featuresNewArray.length; i++) {
//   var j = Math.floor(Math.random() * (FEATURES_LIST.length - 1 + 1)) + 1;
//   featuresNewArray.push(FEATURES_LIST[j]);
// };
// return featuresNewArray;

// после добавления ниже приложенного массива, аватарка всё время 08

function Array(a) {
  this.a = Math.floor(Math.random() * (FEATURES_LIST.length - 1 + 1)) + 1;
}

var featuresNewArray = new Array();

for (i = 0; i < featuresNewArray.a; i++) {
var j = Math.floor(Math.random() * (FEATURES_LIST.length - 1 + 1)) + 1;
featuresNewArray.push(FEATURES_LIST[j]);
};

var infoBookings = [];
var addressCalculationX = function () {
  return Math.floor(Math.random() * (900 - 300 + 1)) + 300;
};
var addressCalculationY = function () {
  return Math.floor(Math.random() * (500 - 100 + 1)) + 100;
};

// ФИГНЯ КАКАЯ-ТО 
// var typeCalculation = ACCOMMODATION_TYPE[Math.floor(Math.random() * ACCOMMODATION_TYPE.length)];
// var textTypeCalculation = function () {
//   if (typeCalculation[i] === ACCOMMODATION_TYPE[0]) {
//     textTypeCalculation = 'квартира';
//   } else if (typeCalculation[i] === ACCOMMODATION_TYPE[1]) {
//     textTypeCalculation = 'дом';
//   } else if (typeCalculation[i] === ACCOMMODATION_TYPE[2]) {
//     textTypeCalculation = 'бунгало';
//   }
// };

for (var i = 0; i < TITLES.length; i++) {
  var locationX = addressCalculationX();
  var locationY = addressCalculationY();
  var booking = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: TITLES[Math.floor(Math.random() * TITLES.length)],
      address: (locationX - 28) + ', ' + (locationY + 75),
      price: Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000,
     // type: textTypeCalculation,
      type: ACCOMMODATION_TYPE[Math.floor(Math.random() * ACCOMMODATION_TYPE.length)],
      rooms: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
      guests: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
      checkin: TIME[Math.floor(Math.random() * TIME.length)],
      checkout: TIME[Math.floor(Math.random() * TIME.length)],
      features: featuresNewArray,
      //features: FEATURES_LIST[Math.floor(Math.random() * FEATURES_LIST.length)],
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

var firstPin = document.querySelector('.tokyo__pin-map');
var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < infoBookings.length; i++) {
  var pinImage = document.querySelector('.pin__main');
  var pinElement = pinImage.cloneNode();
  pinElement.className = 'pin';
  pinElement.style.left = infoBookings[i].location.x + 'px';
  pinElement.style.top = infoBookings[i].location.y + 'px';
  pinElement.innerHTML = '<img src="' + infoBookings[i].author.avatar + '" class="rounded" width="40" height="40">';
  fragmentPin.appendChild(pinElement);
}
firstPin.appendChild(fragmentPin);

var firstAvatar = document.querySelector('.dialog__title');
var fragmentAvatar = document.createDocumentFragment();
document.querySelector('.dialog__title > img').remove();

for (var i = 0; i < 1; i++) {
  var avatarImage = document.querySelector('.dialog__title');
  var avatarElement = avatarImage.cloneNode();
  avatarElement.className = ('img');
  avatarElement.innerHTML = '<img src="' + booking.author.avatar + '" width="70" height="70">';
  fragmentAvatar.appendChild(avatarElement);
}
firstAvatar.appendChild(fragmentAvatar);


var template = document.querySelector('#lodge-template');
// код ниже работает 

var element = template.content.cloneNode(true);

element.querySelector('.lodge__title').textContent = infoBookings[0].offer.title;
element.querySelector('.lodge__address').textContent = infoBookings[0].offer.address;
element.querySelector('.lodge__price').textContent = infoBookings[0].offer.price + '&#x20bd;/ночь';
element.querySelector('.lodge__type').textContent = infoBookings[0].offer.type;
element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + infoBookings[0].offer.guests + '  гостей в ' + infoBookings[0].offer.rooms + ' комнатах';
element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ', выезд до ' + infoBookings[0].offer.checkin;

var featuresListHTML = '<span class="feature__image feature__image--' + infoBookings[0].offer.features + '"></span>';

element.querySelector('.lodge__features').innerHTML = featuresListHTML;

element.querySelector('.lodge__description').textContent = infoBookings[0].offer.description;
element.querySelector('.lodge__photos').textContent = infoBookings[0].offer.photos;

document.querySelector('.dialog__panel').remove();
document.querySelector('.dialog').appendChild(element);

// А ФУНКЦИЯ НИЖЕ (ЧЕРЕЗ ФРАГМЕНТ) ВЫКЛАДЫВАЕТ СРАЗУ ВСЕ ВОСЕМЬ ПРЕДЛОЖЕНИЙ ОДНОГО СОДЕРЖАНИЯ

// var renderInfoBooking = function (newbooking) {

//   var element = template.content.cloneNode(true);
//   element.querySelector('.lodge__title').textContent = infoBookings[i].offer.title;
//   element.querySelector('.lodge__address').textContent = infoBookings[i].offer.address;
//   element.querySelector('.lodge__price').textContent = infoBookings[i].offer.price;
//   element.querySelector('.lodge__type').textContent = infoBookings[i].offer.type;
//   element.querySelector('.lodge__rooms-and-guests').textContent = infoBookings[i].offer.rooms;
//   element.querySelector('.lodge__checkin-time').textContent = infoBookings[i].offer.checkin;
//   element.querySelector('.lodge__features').textContent = infoBookings[i].offer.features;
//   element.querySelector('.lodge__description').textContent = infoBookings[i].offer.description;
//   element.querySelector('.lodge__photos').textContent = infoBookings[i].offer.photos;

// return element;
// };

// var fragment = document.createDocumentFragment();
// for (var i = 0; i < infoBookings.length; i++) {
//   fragment.appendChild(renderInfoBooking(infoBookings[i]));
// }
// document.querySelector('.dialog__panel').remove() ПРОВЕРИТЬ 
// document.querySelector('.dialog').appendChild(element) ПРОВЕРИТЬ 
