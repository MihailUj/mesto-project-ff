const cardTemplate = document.querySelector('#card-template').content;
export function handleDeleteCard(evt){
  evt.target.closest('.places__item').remove();
};

export function handleCardLike(evt){
  evt.target.classList.toggle('card__like-button_is-active');
};

export function createCard(card, deleteCard, cardLike, popupImage){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', popupImage);
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', cardLike);
  return cardElement;
};