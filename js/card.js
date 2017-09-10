// card.js — модуль для отрисовки элемента на карточке
'use strict';

(function () {

  var card = {};
  card.draw = function (pins) {
    var fragmentAvatar = document.createDocumentFragment();
    var firstAvatar = document.querySelector('.dialog__title');

    document.querySelector('.dialog__title > img').remove();
    for (var n = 0; n < pins; n++) {
      var avatarImage = document.querySelector('.dialog__title');
      var avatarElement = avatarImage.cloneNode();
      avatarElement.className = ('img');
      avatarElement.classList.add('image--' + n);
      avatarElement.classList.add('hidden');
      avatarElement.innerHTML = '<img src="' + pins[n].author.avatar + '" width="70" height="70">';
      fragmentAvatar.appendChild(avatarElement);
    }
    firstAvatar.appendChild(fragmentAvatar);
  };

  window.card = card;

})();

