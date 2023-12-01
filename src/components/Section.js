export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._containerElement = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItems(item) {
    this._containerElement.prepend(item);
  }
}
