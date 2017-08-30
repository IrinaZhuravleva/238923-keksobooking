'use strict';
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

var firstPin = document.querySelector('.tokyo__pin-map');
var fragmentPin = document.createDocumentFragment();
for (var n = 0; n < infoBookings.length; n++) {
  var pinImage = document.querySelector('.pin__main');
  var pinElement = pinImage.cloneNode();

  pinElement.className = 'pin';
  pinElement.setAttribute('tabindex', n + 1);
  pinElement.classList.add('pin--' + n);
  pinElement.dataset.pinId = n;
  pinElement.style.left = infoBookings[n].location.x + 'px';
  pinElement.style.top = infoBookings[n].location.y + 'px';
  pinElement.innerHTML = '<img src="' + infoBookings[n].author.avatar + '" class="rounded" width="40" height="40">';
  fragmentPin.appendChild(pinElement);
}
firstPin.appendChild(fragmentPin);


var fragmentAvatar = document.createDocumentFragment();
var firstAvatar = document.querySelector('.dialog__title');

document.querySelector('.dialog__title > img').remove();
for (var n = 0; n < infoBookings.length; n++) {
  var avatarImage = document.querySelector('.dialog__title');
  var avatarElement = avatarImage.cloneNode();
  avatarElement.className = ('img');
  avatarElement.classList.add('image--' + n);
  avatarElement.classList.add('hidden');
  avatarElement.innerHTML = '<img src="' + infoBookings[n].author.avatar + '" width="70" height="70">';
  fragmentAvatar.appendChild(avatarElement);
}
firstAvatar.appendChild(fragmentAvatar);


var renderInfoBooking = function (supperBooking, i) {
  var template = document.querySelector('#lodge-template');
  var element = template.content.cloneNode(true);

  element.querySelector('.dialog__panel').classList.add('dialog--' + i);
  element.querySelector('.dialog__panel').classList.add('hidden');

  element.querySelector('.lodge__title').textContent = supperBooking.offer.title;
  element.querySelector('.lodge__address').textContent = supperBooking.offer.address;
  element.querySelector('.lodge__price').textContent = supperBooking.offer.price + '&#x20bd;/ночь';
  element.querySelector('.lodge__type').textContent = getHumanReadableType(supperBooking.offer.type);
  element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + supperBooking.offer.guests + '  гостей в ' + supperBooking.offer.rooms + ' комнатах';
  element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + supperBooking.offer.checkin + ', выезд до ' + supperBooking.offer.checkout;

  var featuresListHTML = '';
  for (var j = 0; j < supperBooking.offer.features.length; j++) {
    featuresListHTML += '<span class="feature__image feature__image--' + supperBooking.offer.features[j] + '"></span>';
  }

  element.querySelector('.lodge__features').innerHTML = featuresListHTML;
  element.querySelector('.lodge__description').textContent = supperBooking.offer.description;
  element.querySelector('.lodge__photos').textContent = supperBooking.offer.photos;

  return element;

};

var fragment = document.createDocumentFragment();
for (var i = 0; i < infoBookings.length; i++) {
  var currentBooking = infoBookings[i];
  var bookingDialog = renderInfoBooking(currentBooking, i); //d изменено на i
  fragment.appendChild(bookingDialog);
}

document.querySelector('.dialog__panel').remove();
document.querySelector('.dialog').appendChild(fragment);


var dia = document.querySelector('.dialog');
dia.classList.add('hidden');

var selectedDiv;
var parentPin = document.querySelector('.tokyo__pin-map');

parentPin.addEventListener('keydown', function (event) {
  highlight(event.target);
});

parentPin.onclick = function (event) {
  var target = event.target;
  while (target !== parentPin) {
    if (target.tagName === 'DIV') {
      highlight(target);
      return;
    }
    target = target.parentNode;
  }
};


function highlight(node) {
  if (selectedDiv) {
    selectedDiv.classList.remove('pin--active');
  }

  selectedDiv = node;
  selectedDiv.classList.add('pin--active');
  var selectedPin = node.dataset.pinId

  hideAllAvatarPanels();
  hideAllDialogPanels();

  document.querySelector('.dialog--' + selectedPin).classList.remove('hidden');
  document.querySelector('.image--' + selectedPin).classList.remove('hidden');

  document.querySelector('.dialog').classList.remove('hidden');
}


function disableAllPins() {
  var pins = document.querySelectorAll('.pin');
  for (var index = 0; index < pins.length; index++) {
    pins[index].classList.toggle('pin--active', false);
  }
}

function hideAllDialogPanels() {
  var dialogPanels = document.querySelectorAll('.dialog__panel');
  for (var index = 0; index < dialogPanels.length; index++) {
    dialogPanels[index].classList.toggle('hidden', true);
  }
}

function hideAllAvatarPanels() {
  var dialogAvatars = document.querySelectorAll('.dialog__title .img');
  for (var index = 0; index < dialogAvatars.length; index++) {
    dialogAvatars[index].classList.toggle('hidden', true);
  }
}

var closePopup = document.querySelector('.dialog__close');

closePopup.addEventListener('click', function () {
  disableActivePin();
});

function disableActivePin() {
  var dialog = document.querySelector('.dialog');
  event.preventDefault();
  dialog.classList.add('hidden');
  disableAllPins();
}

window.addEventListener('keydown', function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    disableActivePin();
  }
});
