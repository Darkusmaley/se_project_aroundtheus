import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__form-button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving..";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
