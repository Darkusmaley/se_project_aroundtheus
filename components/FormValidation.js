export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

   _hasInvalidInput(inputList) {
     return !this.inputList.every((inputEl) => inputEl.validity.valid);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputerror(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }

    this._hideInputerror(inputEl);
  }

  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(this._inputEls)) {
      this._disableBtn(this._submitBtn, this._inactiveButtonClass);
      return;
    }
    this._enableBtn(this._submitBtn);
  }



  _disableBtn() {
    if (this._submitBtn) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
    }
  }

  _enableBtn() {
    if (this._submitBtn) {
      this._submitBtn.classList.remove(this._inactiveButtonClass);
      this._submitBtn.disabled = false;
    }
  }

  _setEventListeners() {
    const inputEls = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitBtn = this._formElement.querySelector(
      this.submitButtonSelector
    );

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation(config) {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    });
    this._setEventListeners(this._submitBtn);
  }
}
