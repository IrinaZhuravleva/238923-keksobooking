'use strict';

(function () {

  var selectedDiv;
  var parentPin = document.querySelector('.tokyo__pin-map');

  parentPin.addEventListener('keydown', function (event) {
    showCard(event.target);
  });

  parentPin.onclick = function (event) {
    var target = event.target;
    while (target !== parentPin) {
      if (target.tagName === 'DIV' && target.tagName !== 'pin__main') {
        showCard(target);
        return;
      }

      target = target.parentNode;
    }
  };

  function showCard(node) {
    if (selectedDiv) {
      selectedDiv.classList.remove('pin--active');
    }

    selectedDiv = node;
    selectedDiv.classList.add('pin--active');
    var selectedPin = node.dataset.pinId;
    window.hideAllAvatarPanels();
    window.hideAllDialogPanels();

    document.querySelector('.dialog--' + selectedPin).classList.remove('hidden');
    document.querySelector('.dialog__title img').src = window.data[selectedPin].author.avatar;

    document.querySelector('.dialog').classList.remove('hidden');
  }

  window.showCard = showCard;

})();
