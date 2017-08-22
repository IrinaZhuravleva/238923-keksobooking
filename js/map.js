'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ACCOMMODATION_TYPE = ['flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//
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
    result.indexOf(value) === -1 && result.push(value);
  }

  return result;
}

// то есть if(result.indexOf(value) === -1)
// result.push(value);

var infoBookings = [];

for (var i = 0; i < TITLES.length; i++) {

  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);

  var booking = {

    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
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

var firstPin = document.querySelector('.tokyo__pin-map');
var fragmentPin = document.createDocumentFragment();
for (var n = 0; n < infoBookings.length; n++) {
  var pinImage = document.querySelector('.pin__main');
  var pinElement = pinImage.cloneNode();
  pinElement.className = 'pin';
  pinElement.style.left = infoBookings[n].location.x + 'px';
  pinElement.style.top = infoBookings[n].location.y + 'px';
  pinElement.innerHTML = '<img src="' + infoBookings[n].author.avatar + '" class="rounded" width="40" height="40">';
  fragmentPin.appendChild(pinElement);
}
firstPin.appendChild(fragmentPin);

var firstAvatar = document.querySelector('.dialog__title');
var fragmentAvatar = document.createDocumentFragment();
document.querySelector('.dialog__title > img').remove();

var avatarImage = document.querySelector('.dialog__title');
var avatarElement = avatarImage.cloneNode();
avatarElement.className = ('img');
avatarElement.innerHTML = '<img src="' + booking.author.avatar + '" width="70" height="70">';
fragmentAvatar.appendChild(avatarElement);

firstAvatar.appendChild(fragmentAvatar);


var template = document.querySelector('#lodge-template');
// код ниже работает 

var element = template.content.cloneNode(true);

element.querySelector('.lodge__title').textContent = infoBookings[0].offer.title;
element.querySelector('.lodge__address').textContent = infoBookings[0].offer.address;
element.querySelector('.lodge__price').textContent = infoBookings[0].offer.price + '&#x20bd;/ночь';
element.querySelector('.lodge__type').textContent = getHumanReadableType(infoBookings[0].offer.type);
element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + infoBookings[0].offer.guests + '  гостей в ' + infoBookings[0].offer.rooms + ' комнатах';
element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ', выезд до ' + infoBookings[0].offer.checkin;

var featuresListHTML = '';
for (var j = 0; j < infoBookings[0].offer.features.length; j++) {
  featuresListHTML += '<span class="feature__image feature__image--' + infoBookings[0].offer.features[j] + '"></span>';
}


element.querySelector('.lodge__features').innerHTML = featuresListHTML;

element.querySelector('.lodge__description').textContent = infoBookings[0].offer.description;
element.querySelector('.lodge__photos').textContent = infoBookings[0].offer.photos;

document.querySelector('.dialog__panel').remove();
document.querySelector('.dialog').appendChild(element);


function getHumanReadableType(type) {
  var typeString = '';

  if (type === ACCOMMODATION_TYPE[0]) {
    typeString = 'квартира';
  } else if (type === ACCOMMODATION_TYPE[1]) {
    typeString = 'дом';
  } else if (type === ACCOMMODATION_TYPE[2]) {
    typeString = 'бунгало';
  }

  return typeString;
}
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
