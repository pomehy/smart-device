'use strict';

!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){for(;o!==t.body&&!1===(e=p(l=o,"Y")&&a(l,"Y"),r=p(l,"X")&&a(l,"X"),e||r);)o=o.parentNode||o.host;var l,e,r;return o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();

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
