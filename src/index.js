import './pages/index.css';

import {openPopup, closePopup} from './scripts/modal.js'
import {initialCards} from './scripts/cards.js'
import {addCard, handleDeleteCard, handleCardLike} from './scripts/card.js'

const content = document.querySelector('.content');
export const placesList = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms.edit_profile;
const newCardForm = document.forms.new_place;


profileEditButton.addEventListener('click', handlePopupProfileEdit);

profileAddButton.addEventListener('click', function (evt) {
  openPopup(popupNewCard);
});

profileForm.addEventListener('submit', hendleProfileFormSubmit);

newCardForm.addEventListener('submit', hendleNewCardFormSubmit);

function handlePopupProfileEdit(evt) {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
};

function hendleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileForm.name.value;
  profileDescription.textContent = profileForm.description.value;
  closePopup(popupProfileEdit);
};

function hendleNewCardFormSubmit(evt) {
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
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');
  image.alt = evt.target.alt;
  image.src = evt.target.currentSrc;
  caption.textContent = evt.target.alt;
  openPopup(popupImage);
};

export function handleCreateCard(card, deleteCard, cardLike, popupImage){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', popupImage);
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', cardLike);
  return cardElement;
}

initialCards.forEach(addCard);