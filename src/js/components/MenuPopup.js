import Popup from './Popup';

export default class MenuPopup extends Popup {
  constructor(popupElement, api, link1, link2, button, popup) {
    super(popupElement);
    this.api = api;
    this.link1 = link1;
    this.link2 = link2;
    this.button = button;
    this.popup = popupElement;
    this.nextPopup = popup;
  }

  setEventListeners(param) {
    this
      .popup
      .querySelector('.button__popup-close_menu')
      .addEventListener('click', () => {
        this.close(this);
      });
    if (param === false) {
      this
        .button
        .addEventListener('click', () => {
          this.nextPopup.open();
          this.close(this);
        });
      this
        .button
        .removeEventListener('click', () => {
          this.api.logOut();
          window.location.reload();
        });
    } else if (param === true) {
      this
        .button
        .addEventListener('click', () => {
          this.api.logOut();
          window.location.reload();
        });
      this
        .button
        .removeEventListener('click', () => {
          this.nextPopup.open();
          this.close(this);
        });
    }
  }

  checkStatus() {
    this.api.getMe()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
      .then((result) => {
        this.render(true, result.name);
      })
      .catch((err) => {
        this.render(false, 'Авторизоваться');
        return err;
      });
  }

  render(param, name) {
    if (param === false) {
      this.link2.classList.add('header_hidden');
      this.button.querySelector('.button__logout-img').classList.add('header_hidden');
      this.setEventListeners(false);
    } else if (param === true) {
      this.button.querySelector('.button__text').textContent = name;
      this.setEventListeners(true);
    }
  }
}
