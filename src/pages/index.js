import Card from "../components/Card.js";

import FormValidator from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, config } from "../utils/constants.js";
import aroundtheus from "./src/images/Aroundtheus.svg"
//FormValidation

// Profile edit modal
//const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileEditCloseBtn = document.querySelector(
//   "#profile-edit-close-button"
// );

// Profile
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");
//const profileEditForm = document.forms["profile-edit-form"];

// New card modal
const addCardModal = document.querySelector("#new-card-modal");
//const newCardAddButton = document.querySelector(".profile__add-button");
//const newCardCloseBtn = document.querySelector("#add-card-close-button");

// Card
//const cardTitle = document.querySelector(".card__heading");
//const cardImage = document.querySelector(".card__image");
const cardAddForm = document.forms["add-card-form"];
const cardTitleInput = cardAddForm.querySelector("#card-title");
const cardImageInput = cardAddForm.querySelector("#image-link");
const cardListEl = document.querySelector(".cards__list");
//const cardTemplate =
//document.querySelector("#template").content.firstElementChild;

// Image Preview Modal

//const imagePreviewModal = document.querySelector("#image-preview-modal");
//const imagePreviewCloseBtn = document.querySelector("#preview-close-button");
//const imagePreview = document.querySelector("#image-preview");
//const imagePreviewCaption = document.querySelector("#image-preview-caption");

//Buttons

//  const closeButtons = document.querySelectorAll(".modal__close-button");

// modal

//const modalOverlay = document.querySelector(".modal");

// const editProfileFormValidation = new FormValidator(config, profileEditForm);
// editProfileFormValidation.enableValidation();

// const addCardFormValidation = new FormValidator(config, cardAddForm);
// addCardFormValidation.enableValidation();

const formValidators = {};

const enabledValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enabledValidation(config);
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
  const card = generateCard({ name, link });
  cardListEl.prepend(card);
  evt.target.reset();
  formValidators[cardAddForm.getAttribute("name")].disableBtn();
  closeModal(addCardModal);
}

//Functions

// export function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalByEsc);
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);

// }

// export function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalByEsc);
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
// }

// function fillProfileForm() {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// }

function generateCard(cardData) {
  const card = new Card(cardData, "#template", handleCardClick);
  return card.getView();
}

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(modal));
// });

// function closeModalByEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closeModal(openedModal);
//   }
// }

// function closeModalOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.currentTarget);
//   }
// }

// function handleCardClick(name, link) {
//   imagePreview.src = link;
//   imagePreview.alt = name;
//   imagePreviewCaption.textContent = name;
//   openModal(imagePreviewModal);
// }
// Event listeners

// profileEditBtn.addEventListener("click", function () {
//   openModal(profileEditModal);
//   formValidators[profileEditForm.getAttribute("name")].resetValidation();

//   fillProfileForm();
// });

// newCardAddButton.addEventListener("click", function () {
//   openModal(addCardModal);
// });

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// cardAddForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardEl = generateCard(cardData);
  cardListEl.prepend(cardEl);
});

// Class instances

const imagePopupPreview = new PopupWithImage("#image-preview-modal");
imagePopupPreview.setEventListeners();

const profileFormPopup = new PopupWithForm(
  "profile-edit-form",
  handleProfileEditSubmit
);
profileFormPopup.setEventListeners();

const profileInfo = new UserInfo("#name", "#description");

const addCardFormPopup = new PopupWithForm(
  "add-card-form",
  handleAddCardSubmit
);
addCardFormPopup.setEventListeners();
