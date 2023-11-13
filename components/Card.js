export default class Card {
  constructor(data, cardSelector, openModal) {
    this._name = data.name;
    this._link = data.link;
    this._openModal = openModal;
    this._cardSelector = cardSelector;
  }

  getView(data) {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__heading");
    const imagePreview = document.querySelector("#image-preview");

    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;

    cardImageEl.addEventListener("click", () => {  
      imagePreview.src = data.link;
      imagePreview.alt = data.name;
      imagePreviewCaption.textContent = cardData.name;
      this._openModal(imagePreviewModal);
    });

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector("#card-delete-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLIkeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCardIcon();
    });

    //  cardImageEl.addEventListener("click", () =>{
    //   this.openModal(this);
    //  })
  }

  _handleLIkeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _deleteCardIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard(cardData) {
    const card = new Card(cardData, "#template");
    return card.getView();

    return this._element;
  }
}
