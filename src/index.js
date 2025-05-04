import './pages/index.css';

import {openPopup, closePopup} from './scripts/modal.js'
import {initialCards} from './scripts/cards.js'
import {handleDeleteCard, handleCardLike, createCard} from './scripts/card.js'

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const image = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');

const profileForm = document.forms.edit_profile;
const newCardForm = document.forms.new_place;

profileEditButton.addEventListener('click', handlePopupProfileEdit);

profileAddButton.addEventListener('click', function (evt) {
  openPopup(popupNewCard);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

function handlePopupProfileEdit(evt) {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileForm.name.value;
  profileDescription.textContent = profileForm.description.value;
  closePopup(popupProfileEdit);
};

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: newCardForm.place_name.value,
    link: newCardForm.link.value
  };
  addCard(card);
  closePopup(popupNewCard);
  newCardForm.reset();
};

export function handlePopupImage(evt) {
  image.alt = evt.target.alt;
  image.src = evt.target.currentSrc;
  caption.textContent = evt.target.alt;
  openPopup(popupImage);
};

function addCard(card){
  const cardElement = createCard(card, handleDeleteCard, handleCardLike, handlePopupImage);
  placesList.prepend(cardElement);
};

initialCards.forEach(addCard);