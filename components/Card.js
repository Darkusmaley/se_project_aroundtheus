export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector("#card-delete-button");
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__heading");
    const imagePreview = document.querySelector("#image-preview");


    this._likeButton.addEventListener("click", () => {
      this._handleLIkeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCardIcon();
    });

    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;

    cardImageEl.addEventListener("click", () => {
      this._handleCardClick(this._name,this._link);
  });
    
  }

  _handleLIkeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _deleteCardIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
