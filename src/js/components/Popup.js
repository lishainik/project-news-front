export default class Popup {
  constructor(popupElement, form) {
    this.popup = popupElement;
    this.form = form;
  }

  open() {
    this.popup.classList.toggle('popup__shown');
  }

  close() {
    this.popup.classList.remove('popup__shown');
    if (this.form === undefined) {
      return;
    }
    this.clean();
  }

  clean() {
    this.form.reset();
    const errors = document.querySelectorAll('.popup__error');
    errors.forEach((element) => {
      const msg = element;
      msg.textContent = '';
    });
  }

  setEventListeners(nextPopup) {
    this
      .popup
      .querySelector('.button__popup-close')
      .addEventListener('click', () => {
        this.close(this);
      });
    this
      .popup
      .addEventListener('click', (event) => {
        if (event.target.closest('.popup__content')) {
          return;
        }
        this.close(this);
      });
    this
      .popup
      .querySelector('.popup__link')
      .addEventListener('click', () => {
        this.close(this);
        nextPopup.open();
      });
  }
}
