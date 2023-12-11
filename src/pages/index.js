import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import aroundtheus from "../images/Aroundtheus.svg";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";

const aroundTheUS = document.getElementById("AroundtheUS");
aroundTheUS.src = aroundtheus;

// Profile edit modal
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileAvatarBtn = document.querySelector("#avatar-edit-button");
// Profile

const profileTitleInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");
//const profileEditForm = document.forms["profile-edit-form"];

// New card modal
const newCardAddButton = document.querySelector(".profile__add-button");

// Card

//const cardAddForm = document.forms["add-card-form"];

//const cardListEl = document.querySelector(".cards__list");

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
  formValidators[addCardFormPopup.getFormName("add-card-form")].disableBtn();
  addCardFormPopup.close();
  addCardFormPopup.resetForm();
}

function handleAvatarChange(data) {
  editAvatarFormPopup.setLoading(true);
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      profileInfo.setUserInfo(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarFormPopup.setLoading(false, "Save");
    });
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

const editAvatarFormPopup = new PopupConfirmation("#avatar-change-modal");
editAvatarFormPopup.setEventListeners();

profileAvatarBtn.addEventListener("click", () => {
  editAvatarFormPopup.open();
});

newCardAddButton.addEventListener("click", function () {
  addCardFormPopup.open();
});

profileEditBtn.addEventListener("click", function (e) {
  const { name, job } = profileInfo.getUserInfo();
  profileDescriptionInput.value = job;
  profileTitleInput.value = name;
  profileFormPopup.open();
  formValidators[
    profileFormPopup.getFormName("profile-edit-form")
  ].resetValidation();
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});
