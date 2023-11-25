import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupform = this._popupSelector.querySelector(".modal__form");
  }

  close() {
    this._popupform.reset();
    super.close;
  }

  _getInputValues() {
    const inputs = this._popupform.querySelectorAll(".modal__input");
    const inputValues = {};
    inputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    this._popupform.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
