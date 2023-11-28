import Popup from "./Popup.js";

export default class ImagePopup extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePreview = this._popupElement.querySelector("#image-preview");
  }

  open(data) {
    this._imagePreview.src = data.link;
    this._imagePreview.alt = data.name;
    this._imagePreview.textContent = data.name;
    super.open;
  }
}
