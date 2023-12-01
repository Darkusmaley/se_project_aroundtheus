import { cardListEl, generateCard } from "../pages";
import { initialCards } from "../utils/constants";

export default class Section {
  constructor({ items, renderer }) {
    this._containerSelector = document.querySelector(".cards__list");
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.array.forEach((item) => {
      this._renderer(item);
    });
  }

  generateCards() {
    initialCards.forEach((cardData) => {
      const cardEl = generateCard(cardData);
      cardListEl.prepend(cardEl);
    });
  }

  addItems(item) {
    this._containerSelector.prepend(item);
  }
}
