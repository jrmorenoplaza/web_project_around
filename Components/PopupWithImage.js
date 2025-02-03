import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    open(imageUrl, imageCaption) {
        const imageElement = this._popup.querySelector(".zoom-popup__image");
        const captionElement = this._popup.querySelector(".zoom-popup__title");

        imageElement.src = imageUrl;
        imageElement.alt = imageCaption;
        captionElement.textContent = imageCaption;

        super.open(); // Llama al método "open" de la clase base
    }
}
