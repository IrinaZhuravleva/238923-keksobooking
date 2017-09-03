// pin.js — модуль для отрисовки пина и взаимодействия с ним
'use strict';

(function () {
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
    var selectedPin = node.dataset.pinId;
    hideAllAvatarPanels();
    hideAllDialogPanels();
    
    document.querySelector('.dialog--' + selectedPin).classList.remove('hidden');
    document.querySelector('.image--' + selectedPin).classList.remove('hidden');

    document.querySelector('.dialog').classList.remove('hidden');
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
    if (event.keyCode === ESC_KEYCODE) {
      disableActivePin();
    }
  });

})();

