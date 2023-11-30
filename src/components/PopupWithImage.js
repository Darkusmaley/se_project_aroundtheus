import Popup from "./Popup.js";

export default class ImagePopup extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePreview = this._popupElement.querySelector("#image-preview");
  }

  open(name, link) {
    this._imagePreview.src = link;
    this._imagePreview.alt = name;
    this._imagePreview.textContent = name;
    super.open();
  }
}
