export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleCardDelete,
    handleCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this.isLiked = data.isLiked;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector("#card-delete-button");
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__heading");

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });

    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;

    cardImageEl.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  setLikes(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getId() {
    return this.id;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
