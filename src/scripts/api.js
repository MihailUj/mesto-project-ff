import {checkResponse} from'../utils/utils.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '426eecea-2bfc-476a-a361-948126a3a9e7',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return request('/cards', {});
};

export const getCurrentUser = () => {
  return request('/users/me', {});
};

export const updateUserData = (userData) => {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(userData)
  });
};

export const postCard = (cardData) => {
  return request('/cards', {
    method: 'POST',
    body: JSON.stringify(cardData)
  });
};

export const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE'
  });
};

export const likeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
  });
}

export const dislikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
  });
}

export const updateAvatar = (imageUrl) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({
          'avatar': imageUrl
    })
  });
}

function request(url, options) {
    options.headers = config.headers;
    return fetch(config.baseUrl+url, options).then(checkResponse)
}