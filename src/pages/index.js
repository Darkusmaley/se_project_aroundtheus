import Card from "../components/Card.js";

import FormValidator from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import aroundtheus from "../images/Aroundtheus.svg";
//Image

const aroundTheUS = document.getElementById("AroundtheUS");
aroundTheUS.src = aroundtheus;

// Profile edit modal
const profileEditBtn = document.querySelector("#profile-edit-button");
//const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileEditCloseBtn = document.querySelector(
//   "#profile-edit-close-button"
// );

// Profile
//const profileTitle = document.querySelector(".profile__title");
//const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");
const profileEditForm = document.forms["profile-edit-form"];

// New card modal
const addCardModal = document.querySelector("#new-card-modal");
const newCardAddButton = document.querySelector(".profile__add-button");
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

const imagePreviewModal = document.querySelector("#image-preview-modal");
//const imagePreviewCloseBtn = document.querySelector("#preview-close-button");
//const imagePreview = document.querySelector("#image-preview");
const imagePreviewCaption = document.querySelector("#image-preview-caption");

//Buttons

export const closeButtons = document.querySelectorAll(".modal__close-button");

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

function handleProfileEditSubmit(evt) {
  evt.preventDefault;
  profileInfo.setUserInfo({
    name: profileTitleInput.value,
    job: profileDescriptionInput.value,
  });

  profileFormPopup.close();
}

function handleAddCardSubmit() {
  const name = cardTitleInput.values;
  const link = cardImageInput.values;
  const card = generateCard({ name, link });
  cardListEl.prepend(card);
  formValidators[cardAddForm.getAttribute("name")].disableBtn();
  addCardFormPopup.close();
}

//Functions

// function openModal(modal) {
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

function handleCardClick(name, link) {
  imagePopupPreview.open(name, link);
}
// Event listeners

//profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//cardAddForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardEl = generateCard(cardData);
  cardListEl.prepend(cardEl);
});

// Class instances

const imagePopupPreview = new PopupWithImage("#image-preview-modal");
imagePopupPreview.setEventListeners();

const profileFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileFormPopup.setEventListeners();

// profileEditBtn.addEventListener("click", () => {
//   profileInfo.getUserInfo();
//   profileFormPopup.open();
// });

const profileInfo = new UserInfo(".profile__title", ".profile__description");

const addCardFormPopup = new PopupWithForm(
  "#new-card-modal",
  handleAddCardSubmit
);
addCardFormPopup.setEventListeners();

newCardAddButton.addEventListener("click", function () {
  addCardFormPopup.open();
});

profileEditBtn.addEventListener("click", function (e) {
  const { name, job } = profileInfo.getUserInfo();
  profileDescriptionInput.value = job;
  profileTitleInput.value = name;
  profileFormPopup.open();
  formValidators[profileEditForm.getAttribute("name")].resetValidation();
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = profileTitleInput.value;
  const job = profileDescriptionInput.value;
  profileInfo.setUserInfo({name, job});
  profileFormPopup.close();
});
