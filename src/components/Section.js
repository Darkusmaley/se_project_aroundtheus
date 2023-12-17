export default class Section {
  constructor({ renderer }, containerSelector) {
    this._containerElement = document.querySelector(containerSelector);
  
    this._renderer = renderer;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItems(item) {
    this._containerElement.prepend(item);
  }
}
