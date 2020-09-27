const ARTICLES_CARD_CONTAINER = document.querySelector('.results__grid');
const ARTICLES_HEADER = document.querySelector('.header__place_user-info');
const ARTICLES_HEADER_BUTTON = ARTICLES_HEADER.querySelector('.button__place_article');
const ARTICLES_LINK_ONE = ARTICLES_HEADER.querySelector('.header__link_articles', '.header__link');
const ARTICLES_LINK_TWO = ARTICLES_HEADER.querySelector('.header__link_underline');
const USER_INFO_ELEMENT = document.querySelector('.user-info__container');
const USER_INFO_TITLE = USER_INFO_ELEMENT.querySelector('.content-title__place_user-info');
const USER_INFO_TEXT = USER_INFO_ELEMENT.querySelector('.content-subtitle__place_user-info');
const ARTICLES_POPUP_MENU = document.querySelector('.popup__menu');
const POPUP_MENU_LINK_ONE = ARTICLES_POPUP_MENU.querySelector('.popup__link_menu');
const POPUP_MENU_LINK_TWO = ARTICLES_POPUP_MENU.querySelector('.popup__link_menu-secondary');
const POPUP_MENU_BUTTON = ARTICLES_POPUP_MENU.querySelector('.button__popup');
export {
  ARTICLES_CARD_CONTAINER, ARTICLES_HEADER,
  ARTICLES_HEADER_BUTTON, ARTICLES_LINK_ONE, ARTICLES_LINK_TWO,
  USER_INFO_ELEMENT, USER_INFO_TEXT, USER_INFO_TITLE, POPUP_MENU_BUTTON,
  ARTICLES_POPUP_MENU, POPUP_MENU_LINK_ONE, POPUP_MENU_LINK_TWO,
};
