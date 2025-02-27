export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(response) {
        if (!response.ok) {
            return Promise.reject(`Error: ${response.status}`);
        }
        return response.json();
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    updateUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about })
        })
        .then(this._handleResponse);
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards/`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
        .then(this._handleResponse);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards/`, {
            method: "GET",
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(error => console.error("Error al obtener tarjetas:", error));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
        .then(this._handleResponse);
    }
    
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    updateUserAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: avatarUrl })
        })
        .then(this._handleResponse); 
    }
}
