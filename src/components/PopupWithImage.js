import Popup from "./Popup.js";

export default class ImagePopup extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePreview = this._popupElement.querySelector("#image-preview");
    this._imageCaption = document.querySelector("#image-preview-caption");
  }

  open(name, link) {
    this._imagePreview.src = link;
    this._imagePreview.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }
}
