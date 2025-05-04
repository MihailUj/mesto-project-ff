function handlePopup(evt) {
  if (evt.target.classList.contains('popup')
     || evt.target.classList.contains('popup__close')
     || evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
};

export function openPopup(popup){
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handlePopup);
  document.addEventListener('keydown', handlePopup);
};

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', handlePopup);
  document.removeEventListener('keydown', handlePopup);
};



