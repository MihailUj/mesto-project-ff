const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, userId, deleteCard, cardLike, popupImage){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('click', popupImage);
  cardElement.querySelector('.card__title').textContent = card.name;
  if(card.owner._id === userId) {
    deleteButton.addEventListener('click', deleteCard);
  }
  else {
    deleteButton.classList.add('card__delete-button__disabled');
  }
  likeButton.addEventListener('click', cardLike);
  if (isLiked(card.likes, userId)){
    likeButton.classList.add('card__like-button_is-active');
  }
  cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
  cardElement.dataset.id = card._id;
  return cardElement;
};

function isLiked(likes, userId) {
  return likes.some((user)=> user._id === userId);
}