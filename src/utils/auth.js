import api from "./api";

const BASE_URL = "https://auth.nomoreparties.co";

class Auth {
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

  async register(email, password) {
    return await this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    });
  }
  async authorize(email, password) {
    return await this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    });
  }
  async getContent(token) {
    return await this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default auth;
