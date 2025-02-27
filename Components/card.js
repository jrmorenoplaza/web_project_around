export default class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, api) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._isLiked = data.isLiked;
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
        const apiCall = this._isLiked ? this._api.removeLike(this._id) : this._api.addLike(this._id);
    
        apiCall
            .then(updatedCard => {
                console.log("Respuesta de la API al cambiar like:", updatedCard);
                this._isLiked = updatedCard.isLiked;
                this._updateLikeButton();
            })
            .catch(err => console.error("Error al cambiar like:", err));
    }
    

    _updateLikeButton() {
        console.log(`Actualizando botón de like para ${this._name}. isLiked:`, this._isLiked);
    
        if (this._isLiked) {
            this._likeButton.classList.add("heart-active");
            this._likeButton.querySelector(".heart-input").checked = true;
        } else {
            this._likeButton.classList.remove("heart-active");
            this._likeButton.querySelector(".heart-input").checked = false;
        }
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
