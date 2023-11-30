import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import aroundtheus from "../images/Aroundtheus.svg";

const aroundTheUS = document.getElementById("AroundtheUS");
aroundTheUS.src = aroundtheus;

// Profile edit modal
const profileEditBtn = document.querySelector("#profile-edit-button");

// Profile

const profileTitleInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");
const profileEditForm = document.forms["profile-edit-form"];

// New card modal
const newCardAddButton = document.querySelector(".profile__add-button");

// Card

const cardAddForm = document.forms["add-card-form"];

const cardListEl = document.querySelector(".cards__list");

//Buttons

export const closeButtons = document.querySelectorAll(".modal__close-button");

// modal

export const modalOverlay = document.querySelector(".modal");

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

function handleProfileEditSubmit(inputValues) {
  profileInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });

  console.log(profileInfo);
  profileFormPopup.close();
}

function handleAddCardSubmit(data) {
  const card = generateCard(data);
  cardListEl.prepend(card);
  formValidators[cardAddForm.getAttribute("name")].disableBtn();
  addCardFormPopup.close();
}

//Functions

function generateCard(cardData) {
  const card = new Card(cardData, "#template", handleCardClick);
  return card.getView();
}

function handleCardClick(name, link) {
  imagePopupPreview.open(name, link);
}

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
  profileInfo.setUserInfo({ name, job });
  profileFormPopup.close();
});
