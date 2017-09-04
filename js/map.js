// map.js — модуль, который работает с картой. Использует вспомогательные модули:
// card.js — модуль для отрисовки элемента на карточке
// pin.js — модуль для отрисовки пина и взаимодействия с ним
'use strict';

(function () {
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
  for (var i = 0; i < window.infoBookings.length; i++) {
    var currentBooking = window.infoBookings[i];
    var bookingDialog = renderInfoBooking(currentBooking, i);
    fragment.appendChild(bookingDialog);
  }


  document.querySelector('.dialog__panel').remove();
  document.querySelector('.dialog').appendChild(fragment);

  // Сначала найдем тот элемент за который будем тащить наш диалог pinsDraggable[k]Map-user-pic и обработаем событие mousedown — начала перетаскивания нашего диалога

  // var pinHandle = document.querySelector('.pin');
  // var pinsDraggable[k]Map = document.querySelector('body');
  // var draggedItem = null;

  // var pinsDraggable = document.querySelectorAll('.pin');

  // for (var k = 0; k < pinsDraggable.length; k++) {
  //   pinsDraggable[k].addEventListener('mousedown', function (evt) {
  //     // evt.preventDefault()
  //     // evt.preventDefault();

  //     // Запомним координаты точки с которой мы начали перемещать pin
  //     var startCoords = {
  //       x: evt.clientX,
  //       y: evt.clientY
  //     };

  //     evt.currentTarget.addEventListener('dragstart', function (startEvt) {
  //       if (startEvt.currentTarget.tagName.toLowerCase() === 'div') {
  //         draggedItem = evt.currentTarget;
  //         // evt.dataTransfer.setData('text/plain', evt.currentTarget.alt);
  //       }
  //     });

  //     evt.currentTarget.addEventListener('drag', function (moveEvt) {
  //       console.log('x:' + moveEvt.clientX + ' y:' + moveEvt.clientY)

        
  //       var shift = {
  //         x: moveEvt.clientX - (moveEvt.currentTarget.clientWidth / 2),
  //         y: moveEvt.clientY - (moveEvt.currentTarget.clientHeight - 100)
  //       }
  //       moveEvt.currentTarget.style.left = shift.x + 'px';
  //       moveEvt.currentTarget.style.top = shift.y + 'px';

  //     });

  //     evt.currentTarget.addEventListener('dragend', function (moveEvt) {
  //       var shift = {
  //         x: moveEvt.clientX - (moveEvt.currentTarget.clientWidth / 2),
  //         y: moveEvt.clientY - (moveEvt.currentTarget.clientHeight / 2)
  //       }
  //       moveEvt.currentTarget.style.left = shift.x + 'px';
  //       moveEvt.currentTarget.style.top = shift.y + 'px';

  //     });

      
  //   });
  // }


///





// var pinsDraggable = document.querySelectorAll('.pin');

// for (var k = 0; k < pinsDraggable.length; k++) { // цикл for
// var pinDraggable = document.querySelector('.pinsDraggable[k]')

//   pinDraggable.addEventListener('mousedown', function (evt) {


//   evt.preventDefault(); // это отменяет автоматическое перетаскивание квадратной картинки пина
  
//   var startCoords = { // Запомним координаты точки с которой мы начали перемещать
//       x: evt.clientX,
//       y: evt.clientY
//     };

//   var onMouseMove = function (moveEvt) {
//     moveEvt.preventDefault();

//     var shift = {
//       x: startCoords.x - moveEvt.clientX,
//       y: startCoords.y - moveEvt.clientY
//     };

//     startCoords = {
//       x: moveEvt.clientX,
//       y: moveEvt.clientY
//     };

//    pinDraggable.style.top = (pinDraggable.offsetTop - shift.y) + 'px';
//     pinDraggable.style.left = (pinDraggable.offsetLeft - shift.x) + 'px';

      
//   };

//   var onMouseUp = function (upEvt) {
//     upEvt.preventDefault();

//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', onMouseUp);
//   };

//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// });


// }; // всё происходит внутри цикла for


// КОД НИЖЕ ШИКАРНО РАБОТАЕТ

var tokyo = document.querySelector('.tokyo');
var pin = tokyo.querySelector('.pin');


  tokyo.addEventListener('mousedown', function (evt) {
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
     
     address.value = 'координата X ' + (pin.offsetLeft - shift.x - 28) + ', ' + 'координата Y ' + (pin.offsetTop - shift.y + 75);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

 })();

