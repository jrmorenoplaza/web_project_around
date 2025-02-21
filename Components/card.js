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
        const template = document.querySelector(this._templateSelector);
        if (!template) {
            console.error("No se encontró el template:", this._templateSelector);
            return null;
        }
        return template.content.cloneNode(true).querySelector('.card');
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
        console.log(`🃏 Creando tarjeta: ${this._name}, ${this._link}`);
    
        this._title.textContent = this._name;
        this._image.src = this._link;
        this._image.alt = `Imagen de ${this._name}`;
        this._setEventListeners();
    
        if (!this._element) {
            console.error("Error: No se pudo crear el elemento de la tarjeta.");
        }
    
        return this._element;
    }
    
}
