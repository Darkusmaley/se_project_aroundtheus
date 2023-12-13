import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._saveButton = this._popupForm.querySelector(".modal__form-button");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );
    return this._inputValues;
  }

  resetForm() {
    this._popupForm.reset();
  }

  getFormName() {
    return this._popupForm.getAttribute("name");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setLoading(isLoading) {
    if (isLoading == true) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textConetent = this._saveButtonText;
    }
  }
}
