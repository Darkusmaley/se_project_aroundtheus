import {
  closeModalByEsc,
  closeModalOnRemoteClick,
  closeModal,
  openModal,
} from "../utils/utils.js";
import { closeButtons } from "../pages";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add(".modal_opened");
  }

  close() {
    this._popupSelector.classList.remove(".modal_opened");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close;
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close;
      }
    });

    const closeButton = this._popupSelector.querySelector(
      ".modal__close-button"
    );
    closeButton.addEventListener("click", () => {
      this.close;
    });
  }
}
