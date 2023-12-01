import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import aroundtheus from "../images/Aroundtheus.svg";
import Section from "../components/Section.js";

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
    job: inputValues.description,
  });

  profileFormPopup.close();
}

function handleAddCardSubmit(data) {
  section.addItems(generateCard(data));
  formValidators[cardAddForm.getAttribute("name")].disableBtn();
  addCardFormPopup.close();
  cardAddForm.reset();
}

//Functions

export function generateCard(cardData) {
  const card = new Card(cardData, "#template", handleCardClick);
  return card.getView();
}

function handleCardClick(name, link) {
  imagePopupPreview.open(name, link);
}

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

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      section.addItems(generateCard(cardData));
    },
  },
  ".cards__list"
);

section.renderItems();
