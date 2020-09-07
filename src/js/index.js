import '../css/index.css';
import Popup from './components/Popup';
import Form from './components/Form';
import NewsApi from './api/NewsApi';
import spinnerSpinning from './utils/spinner';
import CardList from './components/Cardlist';
import MainApi from './api/MainApi';
import MenuPopup from './components/MenuPopup';
import Header from './components/Header';
import NEW_CARD_CLASS from './const/NEW_CARD_CLASS';
import {
  REGISTRATION_POPUP_ELEMENT,
  LOGIN_POPUP_ELEMENT,
  REGISTERED_POPUP_ELEMENT,
  REGISTRATION_FORM_ELEMENT,
  LOGIN_FORM_ELEMENT,
  ERROR_MSG,
  SEARCH_ELEMENT,
  RESULTS_EMPTY,
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
} from './const/const_main';

const registrationPopup = new Popup(REGISTRATION_POPUP_ELEMENT, REGISTRATION_FORM_ELEMENT);
const loginPopup = new Popup(LOGIN_POPUP_ELEMENT, LOGIN_FORM_ELEMENT);
const registeredPopup = new Popup(REGISTERED_POPUP_ELEMENT);
const registrationForm = new Form(REGISTRATION_FORM_ELEMENT, ERROR_MSG);
const loginForm = new Form(LOGIN_FORM_ELEMENT, ERROR_MSG);
const news = new NewsApi('4f3ecb30c5c047dda5ec66fd2ba91bac');
const mainApi = new MainApi('http://localhost:3000');
const resultsList = new CardList(RESULTS_GRID_CONTAINER, NEW_CARD_CLASS, MORE_BUTTON, mainApi);
const smallMenu = new MenuPopup(MENU_ELEMENT, mainApi, MENU_LINK_ONE, MENU_LINK_TWO,
  MENU_BUTTON, registrationPopup);
const headerMain = new Header(INDEX_HEADER, mainApi,
  INDEX_HEADER_LINK_ONE, INDEX_HEADER_LINK_TWO, INDEX_HEADER_BUTTON, registrationPopup);

headerMain.checkStatus();
smallMenu.checkStatus();

document.querySelector('.header__menu').addEventListener('click', () => {
  smallMenu.open();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    registrationPopup.close();
    loginPopup.close();
    registeredPopup.close();
  }
});

SEARCH_ELEMENT.addEventListener('submit', (event) => {
  event.preventDefault();
  resultsList.reset();
  spinnerSpinning(true);
  resultsList.keyword = event.target.elements[0].value;
  news.getNews(event.target.elements[0].value)
    .then((results) => {
      if (results.totalResults === 0) {
        RESULTS_EMPTY.classList.remove('results_hidden');
      } else {
        RESULTS_ELEMENT.classList.remove('results_hidden');
        resultsList.addCards(results.articles);
        resultsList.render();
      }
    })
    .catch((error) => error)
    .finally(() => {
      spinnerSpinning(false);
    });
});

MORE_BUTTON.addEventListener('click', () => {
  resultsList.render();
});

REGISTRATION_FORM_ELEMENT.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = REGISTRATION_FORM_ELEMENT.querySelector('.button');
  const serverError = REGISTRATION_FORM_ELEMENT.querySelector('.popup__error_server');
  serverError.textContent = '';
  button.setAttribute('disabled', true);
  button.classList.add('button__place_popup-disabled');
  mainApi.createUser(REGISTRATION_FORM_ELEMENT.elements[0].value,
    REGISTRATION_FORM_ELEMENT.elements[1].value, REGISTRATION_FORM_ELEMENT.elements[2].value)
    .then((res) => {
      if (res.ok) {
        registrationPopup.close();
        registeredPopup.open();
      }
      return Promise.reject(res);
    })
    .catch((err) => {
      if (err.status === 409) { serverError.textContent = 'Такой email уже зарегистрирован'; } else { serverError.textContent = 'Ошибка сервера'; }
    });
});

LOGIN_FORM_ELEMENT.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = LOGIN_FORM_ELEMENT.querySelector('.button');
  const serverError = LOGIN_FORM_ELEMENT.querySelector('.popup__error_server');
  serverError.textContent = '';
  button.setAttribute('disabled', true);
  button.classList.add('button__place_popup-disabled');
  mainApi.loginUser(LOGIN_FORM_ELEMENT.elements[0].value, LOGIN_FORM_ELEMENT.elements[1].value)
    .then((res) => {
      if (res.ok) {
        loginPopup.close();
        window.location.reload();
      }
      return Promise.reject(res);
    })
    .catch((err) => {
      if (err.status === 401) { serverError.textContent = 'Неправильная почта или пароль'; } else { serverError.textContent = 'Ошибка сервера'; }
    });
});
registrationPopup.setEventListeners(loginPopup);
loginPopup.setEventListeners(registrationPopup);
registeredPopup.setEventListeners(loginPopup);
registrationForm.setEventListeners();
loginForm.setEventListeners();
