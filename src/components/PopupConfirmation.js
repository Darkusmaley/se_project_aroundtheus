import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__form-button");
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving..";
    } else {
      this._submitButton.textContent = this._submitButton;
    }
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.setSubmitAction();
    });
    super.setEventListeners();
  }
}
