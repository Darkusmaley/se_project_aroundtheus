import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { config } from "../utils/constants.js";
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

// New card modal
const newCardAddButton = document.querySelector(".profile__add-button");

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
  profileFormPopup.setLoading(true);

  api
    .editProfileInfo(inputValues.name, inputValues.description)
    .then((res) => {
      profileInfo.setUserInfo(res);
      profileFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileFormPopup.setLoading(false);
    });
}

function handleAddCardSubmit(data) {
  addCardFormPopup.setLoading(true);
  api
    .addCard(data)
    .then((cardData) => {
      section.addItems(generateCard(cardData));
      formValidators[
        addCardFormPopup.getFormName("add-card-form")
      ].disableBtn();
      addCardFormPopup.close();
      addCardFormPopup.resetForm();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardFormPopup.setLoading(false);
    });
}

function handleAvatarChange(data) {
  editAvatarFormPopup.setLoading(true);
  api
    .updateAvatar(data.link)
    .then((res) => {
      console.log;
      profileInfo.setAvatar(res);
      editAvatarFormPopup.close();
      editAvatarFormPopup.resetForm();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarFormPopup.setLoading(false);
    });
}

function handleCardDelete(card) {
  deleteCardConfirm.open();

  deleteCardConfirm.setSubmitAction(() => {
    deleteCardConfirm.setLoading(true);
    api
      .deleteCard(card.id)
      .then(() => {
        deleteCardConfirm.close();
        card.deleteCard();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteCardConfirm.setLoading(false);
      });
  });
}

function handleCardClick(name, link) {
  imagePopupPreview.open(name, link);
}

function handleCardLike(card) {
  if (!card.isLiked) {
    api
      .likeCard(card.getId())
      .then((res) => {
        card.setLikes(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .unlikeCard(card.getId())
      .then((res) => {
        card.setLikes(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Functions

export function generateCard(cardData) {
  const card = new Card(
    cardData,
    "#template",
    handleCardClick,
    handleCardDelete,
    handleCardLike
  );
  return card.getView();
}

// Class instances

const imagePopupPreview = new PopupWithImage("#image-preview-modal");
imagePopupPreview.setEventListeners();

//Profile form
const profileFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileFormPopup.setEventListeners();

profileEditBtn.addEventListener("click", function (e) {
  const { name, job } = profileInfo.getUserInfo();
  profileDescriptionInput.value = job;
  profileTitleInput.value = name;
  profileFormPopup.open();
  formValidators[
    profileFormPopup.getFormName("profile-edit-form")
  ].resetValidation();
});

//User info
const profileInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

//Add Card
const addCardFormPopup = new PopupWithForm(
  "#new-card-modal",
  handleAddCardSubmit
);
addCardFormPopup.setEventListeners();

newCardAddButton.addEventListener("click", function () {
  addCardFormPopup.open();
});

//Avatar edit
const editAvatarFormPopup = new PopupWithForm(
  "#avatar-change-modal",
  handleAvatarChange
);
editAvatarFormPopup.setEventListeners();

profileAvatarBtn.addEventListener("click", () => {
  editAvatarFormPopup.open();
});

//Card delete
const deleteCardConfirm = new PopupConfirmation("#card-delete-modal");
deleteCardConfirm.setEventListeners();

const section = new Section(
  {
    renderer: (cardData) => {
      section.addItems(generateCard(cardData));
    },
  },
  ".cards__list"
);

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "525b4ade-ecb7-453a-b4ec-d9e0e572249f",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((data) => {
    section.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .loadUserInfo()
  .then((res) => {
    profileInfo.setUserInfo(res);
    profileInfo.setAvatar(res);
  })
  .catch((err) => {
    console.log(err);
  });
