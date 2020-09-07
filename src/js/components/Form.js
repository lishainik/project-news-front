export default class Form {
  constructor(form, errors) {
    this.form = form;
    this.errors = errors;
  }

  checkInputValidity(element) {
    const error = element.nextElementSibling;
    if (element.validity.valueMissing) {
      error.textContent = this.errors.noInput;
      return false;
    }

    if ((element.validity.tooShort || element.validity.tooLong) && element.type === 'text') {
      error.textContent = this.errors.inputLength;
      return false;
    }

    if (element.type === 'email' && (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(element.value) === false)) {
      error.textContent = this.errors.notEmail;
      return false;
    }

    error.textContent = '';

    return true;
  }

  setSubmitButtonState(isValidForm) {
    const button = this.form.querySelector('button');
    if (isValidForm === true) {
      button.removeAttribute('disabled');
      button.classList.remove('button__place_popup-disabled');
      return;
    }
    if (isValidForm === false) {
      button.setAttribute('disabled', true);
      button.classList.add('button__place_popup-disabled');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', () => {
      const inputs = Array.from(this.form.elements);
      let isValidForm = true;
      inputs.forEach((element) => {
        if (!element.classList.contains('button')) {
          if (!this.checkInputValidity(element)) {
            isValidForm = false;
          }
        }
      });
      this.setSubmitButtonState(isValidForm);
    });
  }
}
