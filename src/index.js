import './pages/index.css';

import {openPopup, closePopup} from './scripts/modal.js';
import {initialCards} from './scripts/cards.js';
import {createCard} from './scripts/card.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getInitialCards, getCurrentUser, updateUserData, postCard, deleteCard, likeCard, dislikeCard, updateAvatar} from './scripts/api.js';
import {handleSubmit} from'./utils/utils.js'
import {validationConfig, placesList, profileEditButton, profileAddButton, avatarEditButton, popupProfileEdit, popupNewCard, popupImage, popupAvatarEdit, profileTitle, profileDescription, profileImage, image, caption, profileForm, newCardForm, avatarForm} from './utils/constants.js'

let userId = null;

enableValidation(validationConfig);

profileEditButton.addEventListener('click', handlePopupProfileEdit);
profileAddButton.addEventListener('click', handlePopupNewCard);
avatarEditButton.addEventListener('click', handlePopupAvatarEdit);

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

//обработчики открытия модальных окон
function handlePopupProfileEdit(evt) {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  clearValidation(profileForm);
  openPopup(popupProfileEdit);
};

function handlePopupNewCard(evt){
  clearValidation(newCardForm);
  openPopup(popupNewCard);
}

function handlePopupImage(evt) {
  image.alt = evt.target.alt;
  image.src = evt.target.currentSrc;
  caption.textContent = evt.target.alt;
  openPopup(popupImage);
};

function handlePopupAvatarEdit(evt) {
  clearValidation(avatarForm);
  openPopup(popupAvatarEdit);
}

//Обработчики отправки форм
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    const userData = {
    name: profileForm.name.value,
    about: profileForm.description.value
    };
    return updateUserData(userData).then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(popupProfileEdit);
    });
  }
  handleSubmit(makeRequest, evt);
};

function handleNewCardFormSubmit(evt) {
  function makeRequest() {
    const card = {
    name: newCardForm.place_name.value,
    link: newCardForm.link.value
    };
    return postCard(card).then((card) => {
      addCard(card);
      closePopup(popupNewCard);
    });
  }
  handleSubmit(makeRequest, evt);
};

function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return updateAvatar(avatarForm.link.value).then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupAvatarEdit);
    });
  }
  handleSubmit(makeRequest, evt);
}

function addCard(card){
  const cardElement = createCard(card, userId, handleDeleteCard, handleCardLike, handlePopupImage);
  placesList.prepend(cardElement);
};

Promise.all([getCurrentUser(), getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach(addCard);
  })
  .catch((err) => {
      console.log(err);
  });

function handleDeleteCard(evt){
  const card = evt.target.closest('.places__item');
  deleteCard(card.dataset.id)
  .then((res) => {
    card.remove();
  })
  .catch((err) => {
    console.log(err);
  })
};

function handleCardLike(evt){
  const card = evt.target.closest('.places__item');
  const likeCounter = card.querySelector('.card__like-counter');
  const likeButton = evt.target;
  if(!likeButton.classList.contains('card__like-button_is-active')){
    likeCard(card.dataset.id)
    .then((card) => {
      likeCounter.textContent = card.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
    console.log(err);
    });
  }
  else {
    dislikeCard(card.dataset.id)
    .then((card) => {
      likeCounter.textContent = card.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
    console.log(err);
    });
  }
};