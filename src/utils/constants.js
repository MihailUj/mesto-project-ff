export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const content = document.querySelector('.content');
export const placesList = content.querySelector('.places__list');

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

export const popupProfileEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
export const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileImage = document.querySelector('.profile__image');

export const image = popupImage.querySelector('.popup__image');
export const caption = popupImage.querySelector('.popup__caption');

export const profileForm = document.forms.edit_profile;
export const newCardForm = document.forms.new_place;
export const avatarForm = document.forms.edit_avatar;