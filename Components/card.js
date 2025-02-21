export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;  // ID necesario para eliminar la tarjeta del servidor
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

    _handleImageClick() {
        this._handleCardClick(this._link, this._name);
    }

    // ✅ Nueva función para eliminar la tarjeta del servidor y del DOM
    deleteCard() {
        fetch(`https://around-api.es.tripleten-services.com/v1/cards/${this._id}`, {
            method: "DELETE",
            headers: {
                Authorization: "6fdd9345-6378-4693-86e9-66ccfae37409",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar la tarjeta: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            console.log(`🗑 Tarjeta eliminada: ${this._name}`);
            this._element.remove();  // ✅ Eliminamos la tarjeta del DOM solo si el servidor la elimina correctamente
        })
        .catch(error => {
            console.error("Error al eliminar la tarjeta:", error);
            alert("Hubo un problema al eliminar la tarjeta.");
        });
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => this.deleteCard());  // ✅ Ahora eliminará correctamente la tarjeta
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
