const initialCards = [
  {
    name: "Yosimite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Elements

// Profile edit modal
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseBtn = document.querySelector(
  "#profile-edit-close-button"
);

// Profile
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");
const profileEditForm = profileEditModal.querySelector(".modal__form");

// New card modal
const addCardModal = document.querySelector("#new-card-modal");
const newCardAddButton = document.querySelector(".profile__add-button");
const newCardCloseBtn = document.querySelector("#add-card-close-button");

// Card
const cardTitle = document.querySelector(".card__heading");
const cardImage = document.querySelector(".card__image");
const cardAddForm = addCardModal.querySelector("#add-card-form");
const cardTitleInput = cardAddForm.querySelector("#card-title");
const cardImageInput = cardAddForm.querySelector("#image-link");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#template").content.firstElementChild;

// Image Preview Modal

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewCloseBtn = document.querySelector("#preview-close-button");
const imagePreview = document.querySelector("#image-preview");
const imagePreviewCaption = document.querySelector("#image-preview-caption");

//Buttons

const closeButtons = document.querySelectorAll(".modal__close-button");

//Event handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link });
  evt.target.reset();
  closeModal(addCardModal);
}

//Functions

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__heading");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector("#card-delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    openModal(imagePreviewModal);
    imagePreview.src = cardData.link;
    imagePreviewCaption.textContent = cardData.name;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openCardModal() {
  openNewCardModal();
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Event listeners

profileEditBtn.addEventListener("click", function () {
  openModal(profileEditModal);
  fillProfileForm();
});

newCardAddButton.addEventListener("click", function () {
  openModal(addCardModal);
});

imagePreview.addEventListener("click", () => {
  openModal(imagePreviewModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData));
