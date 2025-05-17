import './pages/index.css';

import {openPopup, closePopup} from './scripts/modal.js';
import {initialCards} from './scripts/cards.js';
import {createCard} from './scripts/card.js';
import {enableValidation, clearValidation, toggleButtonText} from './scripts/validation.js';
import {getInitialCards, getCurrentUser, updateUserData, postCard, deleteCard, likeCard, dislikeCard, updateAvatar} from './scripts/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const image = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');

const profileForm = document.forms.edit_profile;
const newCardForm = document.forms.new_place;
const avatarForm = document.forms.edit_avatar;

let userId = null;

enableValidation(validationConfig);

profileEditButton.addEventListener('click', handlePopupProfileEdit);
profileAddButton.addEventListener('click', function (evt) {
  openPopup(popupNewCard);
});
avatarEditButton.addEventListener('click', handlePopupAvatarEdit);

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

//обработчики открытия модальных окон
function handlePopupProfileEdit(evt) {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openPopup(popupProfileEdit);
};

function handlePopupImage(evt) {
  image.alt = evt.target.alt;
  image.src = evt.target.currentSrc;
  caption.textContent = evt.target.alt;
  openPopup(popupImage);
};

function handlePopupAvatarEdit(evt) {
  openPopup(popupAvatarEdit);
}

//Обработчики отправки форм
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const userData = {
    name: profileForm.name.value,
    about: profileForm.description.value
  };
  updateUserData(userData).then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closePopup(popupProfileEdit);
  })
  .finally(()=>{
    toggleButtonText(profileForm);
  });
};

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: newCardForm.place_name.value,
    link: newCardForm.link.value
  };
  postCard(card).then((res) => {
    addCard(res);
    closePopup(popupNewCard);
    clearValidation(newCardForm, validationConfig);
    newCardForm.reset();
  })
  .finally(()=>{
    toggleButtonText(newCardForm);
  });
};

function handleAvatarFormSubmit(evt) {
  const avatarLink = avatarForm.link.value;
  console.log(avatarLink);
  updateAvatar(avatarLink).then((res)=>{
    profileImage.style.backgroundImage = `url(${res.avatar})`;
    clearValidation(popupAvatarEdit, validationConfig);
    avatarForm.reset();
  })
  .finally(()=>{
    toggleButtonText(avatarForm);
  });
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

function handleDeleteCard(evt){
  const card = evt.target.closest('.places__item');
  deleteCard(card.dataset.id).then((card) => {
    card.remove();
  });
};

function handleCardLike(evt){
  const card = evt.target.closest('.places__item');
  const likeCounter = card.querySelector('.card__like-counter');
  const likeButton = evt.target;
  if(!likeButton.classList.contains('card__like-button_is-active')){
    likeCard(card.dataset.id).then((card) => {
      likeCounter.textContent = card.likes.length;
    })
    likeButton.classList.toggle('card__like-button_is-active');
  }
  else {
    dislikeCard(card.dataset.id).then((card) => {
      likeCounter.textContent = card.likes.length;
    })
    likeButton.classList.toggle('card__like-button_is-active');
  }
};