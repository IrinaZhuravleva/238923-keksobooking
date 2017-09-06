// pin.js — модуль для отрисовки пина и взаимодействия с ним
'use strict';

(function () {
  var firstPin = document.querySelector('.tokyo__pin-map');
  var fragmentPin = document.createDocumentFragment();
  for (var n = 0; n < window.infoBookings.length; n++) {
    var pinImage = document.querySelector('.pin__main');
    var pinElement = pinImage.cloneNode();

    pinElement.className = 'pin';
    pinElement.setAttribute('tabindex', n + 1);
    pinElement.setAttribute('draggable', true);// map.js таскабельный элемент draggable="true"
    pinElement.classList.add('pin--' + n);
    pinElement.dataset.pinId = n;
    pinElement.style.left = window.infoBookings[n].location.x + 'px';
    pinElement.style.top = window.infoBookings[n].location.y + 'px';
    pinElement.innerHTML = '<img src="' + window.infoBookings[n].author.avatar + '" class="rounded" width="40" height="40">';
    fragmentPin.appendChild(pinElement);
  }
  firstPin.appendChild(fragmentPin);

  function hideAllDialogPanels() {
    var dialogPanels = document.querySelectorAll('.dialog__panel');
    for (var index = 0; index < dialogPanels.length; index++) {
      dialogPanels[index].classList.toggle('hidden', true);
    }
  }
  window.hideAllDialogPanels = hideAllDialogPanels;


  function hideAllAvatarPanels() {
    var dialogAvatars = document.querySelectorAll('.dialog__title .img');
    for (var index = 0; index < dialogAvatars.length; index++) {
      dialogAvatars[index].classList.toggle('hidden', true);
    }
  }
  window.hideAllAvatarPanels = hideAllAvatarPanels;

  function disableAllPins() {
    var pins = document.querySelectorAll('.pin');
    for (var index = 0; index < pins.length; index++) {
      pins[index].classList.toggle('pin--active', false);
    }
  }

  function disableActivePin() {
    var dialog = document.querySelector('.dialog');
    event.preventDefault();
    dialog.classList.add('hidden');
    disableAllPins();
  }

  window.addEventListener('keydown', function (event) {
    if (event.keyCode === window.ESC_KEYCODE) {
      disableActivePin();
    }
  });

  var dia = document.querySelector('.dialog');
  dia.classList.add('hidden');

  var closePopup = document.querySelector('.dialog__close');

  closePopup.addEventListener('click', function () {
    disableActivePin();
  });

})();

