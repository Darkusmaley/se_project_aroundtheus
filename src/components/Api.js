export default class Api {
  constructor({ baseUrl, header }) {
    this._baseUrl = baseUrl;
    this._header = header;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      header: this._header,
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json;
    }
    return Promise.reject(`Error:${res.status}`);
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      header: this._header,
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  editProfileInfo(title, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      header: this._header,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      header: this._header,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/:${id}`, {
      method: "DELETE",
      header: this._header,
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/:${id}/likes`, {
      method: "PUT",
      header: this._header,
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  unlikeCard(id) {
    return fetch(`${this._baseUrl}/cards/:${id}/likes`, {
      method: "DELETE",
      header: this._header,
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      header: this._header,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  loadingPage() {
    return Promise.all([this.getInitialCards(), this.loadUserInfo()]);
  }
}
