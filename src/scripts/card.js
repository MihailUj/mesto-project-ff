import {handleCreateCard, handlePopupImage, placesList} from '../index.js'

export function addCard(card){
  const cardElement = handleCreateCard(card, handleDeleteCard, handleCardLike, handlePopupImage);
  placesList.prepend(cardElement);
}

export function handleDeleteCard(evt){
  evt.target.closest('.places__item').remove();
}

export function handleCardLike(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}