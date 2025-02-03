export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector('.card__delete');
        this._image = this._element.querySelector('.card__img');
        this._title = this._element.querySelector('h3');
    }

    _getTemplate() {
        const template = document.querySelector(this._templateSelector).content;
        return template.cloneNode(true).querySelector('.card');
    }

    _handleDeleteClick() {
        this._element.remove();
    }

    _handleImageClick() {
        this._handleCardClick(this._link, this._name);
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
        this._image.addEventListener('click', () => this._handleImageClick());
    }

    getCard() {
        this._title.textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
        this._setEventListeners();
        return this._element;
    }
}
