'use strict';

(function () {
  const anchors = document.querySelectorAll('a[href*=\'#\']');

  if (anchors) {
    for (let anchor of anchors) {
      anchor.addEventListener('click', (evt) => {
        evt.preventDefault();

        const targetId = anchor.getAttribute('href').substring(1);

        if (targetId) {
          document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    }
  }
})();

(function () {
  const forms = document.querySelectorAll('.form');

  const addLocalStorage = function (inputElement) {
    let isStorageSupport = true;

    if (isStorageSupport) {
      if (inputElement.dataset.field === 'user-phone' || inputElement.dataset.field === 'user-name' || inputElement.dataset.field === 'user-message') {
        let storageKey = inputElement.dataset.field;
        let storageValue = inputElement.value;
        localStorage.setItem(storageKey, storageValue);
      }
    }
  };

  if (forms) {
    for (let k = 0; k < forms.length; k++) {
      const inputForms = forms[k].querySelectorAll('input');
      const textareaForms = forms[k].querySelectorAll('textarea');

      for (let j = 0; j < inputForms.length; j++) {
        if (inputForms[j].type === 'tel') {
          inputForms[j].removeAttribute('maxlength');

          const maskPhone = function (evt) {
            let keyCode = evt.keyCode;
            var pos = inputForms[j].selectionStart;
            if (pos < 2) {
              evt.preventDefault();
            }
            let matrix = '+7 (___) ___ ____';
            let i = 0;
            let def = matrix.replace(/\D/g, '');
            let value = inputForms[j].value.replace(/\D/g, '');
            let newValue = matrix.replace(/[_\d]/g, function (a) {
              return i < value.length ? value.charAt(i++) || def.charAt(i) : a;
            });
            i = newValue.indexOf('_');
            if (i !== -1) {
              newValue = newValue.slice(0, i);
            }
            let reg = matrix.substr(0, inputForms[j].value.length).replace(/_+/g,
                function (event) {
                  return '\\d{1,' + event.length + '}';
                }).replace(/[+()]/g, '\\$&');
            reg = new RegExp('^' + reg + '$');
            if (!reg.test(inputForms[j].value) || inputForms[j].value.length < 5 || keyCode > 47 && keyCode < 58) {
              inputForms[j].value = newValue;
            }
            if (evt.type === 'blur' && inputForms[j].value.length < 5) {
              inputForms[j].value = '';
            }
          };
          inputForms[j].addEventListener('input', maskPhone, false);
          inputForms[j].addEventListener('focus', maskPhone, false);
          inputForms[j].addEventListener('blur', maskPhone, false);
          inputForms[j].addEventListener('keydown', maskPhone, false);
        }

        if (inputForms[j].id === 'user-name' || inputForms[j].id === 'callback-user-name') {
          const regex = /[^a-zA-Zа-яА-ЯёЁ .]/i;

          inputForms[j].addEventListener('input', function () {
            inputForms[j].value = inputForms[j].value.replace(regex, '');

            if (inputForms[j].value.match(regex)) {
              inputForms[j].setCustomValidity('Введите буквы');
            }
          });
        }

        forms[k].addEventListener('submit', function () {
          addLocalStorage(inputForms[j]);
        });
      }

      for (let textareaForm of textareaForms) {
        forms[k].addEventListener('submit', function () {
          addLocalStorage(textareaForm);
        });
      }
    }
  }
})();

(function () {
  const accrodionElements = document.querySelectorAll('.page-footer__accordion');
  const accordionToggles = document.querySelectorAll('.page-footer__accordion h2');
  const mobileScreen = window.matchMedia('(max-width: 767px)');

  if (accrodionElements) {
    for (let i = 0; i < accrodionElements.length; i++) {
      accrodionElements[i].classList.remove('page-footer__accordion--nojs');
    }
  }

  if (accordionToggles) {
    for (let i = 0; i < accordionToggles.length; i++) {
      accordionToggles[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        if (mobileScreen.matches) {
          let array = Array.from(accordionToggles);
          let target = evt.target;
          let index = array.indexOf(target);

          array.forEach(function (item, j) {
            if (j === index) {
              accrodionElements[j].classList.toggle('page-footer__accordion--active');
            } else {
              accrodionElements[j].classList.remove('page-footer__accordion--active');
            }
          });
        }
      });
    }
  }
})();

(function () {
  const pageBody = document.querySelector('.page-body');
  const modals = document.querySelectorAll('.modal');
  const modalCallback = document.querySelector('.modal--callback');
  const callbackButton = document.querySelector('.page-header__callback a');
  const callbackUserName = document.querySelector('#callback-user-name');

  if (callbackButton) {
    callbackButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalCallback.classList.add('modal--show');
      pageBody.classList.add('page-body--no-scroll');

      if (callbackUserName) {
        callbackUserName.focus();
      }
    });
  }

  if (modalCallback) {
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        if (modalCallback.classList.contains('modal--show')) {
          modalCallback.classList.remove('modal--show');
        }
        pageBody.classList.remove('page-body--no-scroll');
      }
    });
  }

  if (modals) {
    for (let i = 0; i < modals.length; i++) {
      modals[i].addEventListener('click', (evt) => {
        if (evt.target.classList.contains('modal--show') || evt.target.classList.contains('modal__wrapper') || evt.target.classList.contains('modal__close')) {
          modals[i].classList.remove('modal--show');
          pageBody.classList.remove('page-body--no-scroll');
        }
      });
    }
  }
})();
