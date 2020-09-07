import '../../css/articles.css';
import MainApi from '../api/MainApi';
import MenuPopup from '../components/MenuPopup';
import Header from '../components/Header';
import UserInfoBlock from '../components/UserInfoBlock';
import redirecter from '../utils/redirecter';
import NEW_SAVED_CARD_CLASS from '../const/NEW_SAVED_CARD_CLASS';
import SavedCardList from '../components/SavedCardList';
import {
  ARTICLES_CARD_CONTAINER, ARTICLES_HEADER,
  ARTICLES_HEADER_BUTTON, ARTICLES_LINK_ONE, ARTICLES_LINK_TWO,
  USER_INFO_ELEMENT, USER_INFO_TITLE, USER_INFO_TEXT, ARTICLES_POPUP_MENU,
  POPUP_MENU_LINK_ONE, POPUP_MENU_LINK_TWO, POPUP_MENU_BUTTON,
} from '../const/const_article';

const articlesApi = new MainApi('http://localhost:3000');
const userInfo = new UserInfoBlock(USER_INFO_ELEMENT, USER_INFO_TITLE,
  USER_INFO_TEXT, articlesApi);
const savedCards = new SavedCardList(ARTICLES_CARD_CONTAINER, articlesApi,
  NEW_SAVED_CARD_CLASS, userInfo);
const articlesHeader = new Header(ARTICLES_HEADER, articlesApi,
  ARTICLES_LINK_ONE, ARTICLES_LINK_TWO, ARTICLES_HEADER_BUTTON);
const smallMenuArticles = new MenuPopup(ARTICLES_POPUP_MENU, articlesApi,
  POPUP_MENU_LINK_ONE, POPUP_MENU_LINK_TWO, POPUP_MENU_BUTTON);

redirecter(articlesApi, '/index.html');

smallMenuArticles.checkStatus();

userInfo.render();

articlesHeader.checkStatus();

savedCards.renderAll();

document.querySelector('.header__menu').addEventListener('click', () => {
  smallMenuArticles.open();
});
