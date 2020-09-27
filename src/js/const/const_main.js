const REGISTRATION_POPUP_ELEMENT = document.querySelector('.popup__register');
const LOGIN_POPUP_ELEMENT = document.querySelector('.popup__login');
const REGISTERED_POPUP_ELEMENT = document.querySelector('.popup__registred');
const REGISTRATION_FORM_ELEMENT = document.forms.registration;
const LOGIN_FORM_ELEMENT = document.forms.login;
const ERROR_MSG = { noInput: 'Это обязательное поле', inputLength: 'Поле должно быть от 2 до 30 символов', notEmail: 'Введите корректный адрес email' };
const SEARCH_ELEMENT = document.forms.search;
const RESULTS_EMPTY = document.querySelector('.results__no-results');
const SPINNER_PRELOADER = document.querySelector('.results__preloader');
const RESULTS_ELEMENT = document.querySelector('.results');
const RESULTS_GRID_CONTAINER = document.querySelector('.results__grid');
const MORE_BUTTON = document.querySelector('.button__place_results');
const MENU_ELEMENT = document.querySelector('.popup__menu');
const INDEX_HEADER = document.querySelector('.header__place_search');
const INDEX_HEADER_LINK_ONE = INDEX_HEADER.querySelector('.header__link_underline');
const INDEX_HEADER_LINK_TWO = INDEX_HEADER.querySelector('.header__link_secondary');
const INDEX_HEADER_BUTTON = INDEX_HEADER.querySelector('.button__place_main');
const MENU_LINK_ONE = MENU_ELEMENT.querySelector('.popup__link_menu');
const MENU_LINK_TWO = MENU_ELEMENT.querySelector('.popup__link_menu-secondary');
const MENU_BUTTON = MENU_ELEMENT.querySelector('.button__popup');

export {
  REGISTRATION_POPUP_ELEMENT,
  LOGIN_POPUP_ELEMENT,
  REGISTERED_POPUP_ELEMENT,
  REGISTRATION_FORM_ELEMENT,
  LOGIN_FORM_ELEMENT,
  ERROR_MSG,
  SEARCH_ELEMENT,
  RESULTS_EMPTY,
  SPINNER_PRELOADER,
  RESULTS_ELEMENT,
  RESULTS_GRID_CONTAINER,
  MORE_BUTTON,
  MENU_ELEMENT,
  INDEX_HEADER,
  INDEX_HEADER_LINK_ONE,
  INDEX_HEADER_LINK_TWO,
  INDEX_HEADER_BUTTON,
  MENU_LINK_ONE,
  MENU_LINK_TWO,
  MENU_BUTTON,
};
