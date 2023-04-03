// Для работы с API создайте класс Api.
// Все запросы должны быть методами этого класса.
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Err: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  async getCurrentUserInfo() {
    return await this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // Загрузка карточек с сервера
  async getInitialCards() {
    return await this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // Редактирование профиля
  async editUserInfo(data) {
    return await this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  // Добавление новой карточки
  async addCard(data) {
    return await this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  // Удаление карточки с сервера
  async deleteCard(cardId) {
    return await this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Постановка и снятие лайка
  async addLike(cardId) {
    return await this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  async removeLike(cardId) {
    return await this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(obj, variable) {
    this._status = variable ? this.addLike(obj._id) : this.removeLike(obj._id);
    return this._status;
  }

  // Обновление аватара пользователя:
  async updateUserAvatar(data) {
    return await this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "38c8a8c8-7306-4445-b79c-2958495ffcfd",
    "Content-Type": "application/json",
  },
});

export default api;
