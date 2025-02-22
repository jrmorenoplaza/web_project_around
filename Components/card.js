export default class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, api) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._isLiked = data.isLiked; // Usamos la propiedad booleana directamente
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._api = api;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    _toggleLike() {
        if (this._isLiked) {
            this._api.removeLike(this._id)
                .then(updatedCard => {
                    this._isLiked = updatedCard.isLiked; // Actualiza el estado del like
                    this._updateLikeButton();
                })
                .catch(err => console.error("Error al quitar like:", err));
        } else {
            this._api.addLike(this._id)
                .then(updatedCard => {
                    this._isLiked = updatedCard.isLiked;
                    this._updateLikeButton();
                })
                .catch(err => console.error("Error al agregar like:", err));
        }
    }

    _updateLikeButton() {
        this._likeButton.classList.toggle("heart-active", this._isLiked);
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => this._toggleLike());
        this._deleteButton.addEventListener("click", () => this._handleDeleteClick(this._id, this._element));
        this._image.addEventListener("click", () => this._handleCardClick(this._link, this._name));
    }

    getCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector(".card__img");
        this._title = this._element.querySelector("h3");
        this._likeButton = this._element.querySelector(".heart-checkbox");
        this._deleteButton = this._element.querySelector(".card__delete");

        this._image.src = this._link;
        this._image.alt = this._name;
        this._title.textContent = this._name;

        this._updateLikeButton();
        this._setEventListeners();

        return this._element;
    }
}
