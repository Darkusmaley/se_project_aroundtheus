export default class Popup {
  constructor({popupSelector}) {
    this._popupElement = document.querySelector(popupSelector);
     this._handleEsc = (e)=> {
this._handleEscClose(e)
     }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown",  this._handleEsc);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEsc);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target === this._popupElement ||
        evt.target.classList.contains("modal__close-button")
      ) {
        this.close();
      }
    });

    const closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
