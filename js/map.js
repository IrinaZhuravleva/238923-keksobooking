// map.js — модуль, который работает с картой. Использует вспомогательные модули:
// card.js — модуль для отрисовки элемента на карточке
// pin.js — модуль для отрисовки пина и взаимодействия с ним
'use strict';

(function () {

  var map = {};

  map.draw = function (pins) {
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

    function getHumanReadableType(type) {
      var typeString = '';
      if (type === window.ACCOMMODATION_TYPE[0]) {
        typeString = 'квартира';
      } else if (type === window.ACCOMMODATION_TYPE[1]) {
        typeString = 'дом';
      } else if (type === window.ACCOMMODATION_TYPE[2]) {
        typeString = 'бунгало';
      }

      return typeString;
    }


    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var currentBooking = pins[i];
      var bookingDialog = renderInfoBooking(currentBooking, i);
      fragment.appendChild(bookingDialog);
    }


    document.querySelector('.dialog__panel').remove();
    document.querySelector('.dialog').appendChild(fragment);


    var tokyo = document.querySelector('.tokyo');
    var pin = tokyo.querySelector('.pin');


    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pin.style.top = (pin.offsetTop - shift.y) + 'px';
        pin.style.left = (pin.offsetLeft - shift.x) + 'px';

        var address = document.getElementById('address');
        address.value = 'x: ' + (pin.offsetLeft - shift.x - 28) + ', ' + 'y: ' + (pin.offsetTop - shift.y + 75);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.map = map;

})();

