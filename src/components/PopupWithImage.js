import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(imageUrl, imageCaption) {
        const imageElement = this._popup.querySelector(".zoom-popup__image");
        const captionElement = this._popup.querySelector(".zoom-popup__title");

        imageElement.src = imageUrl;
        imageElement.alt = imageCaption;
        captionElement.textContent = imageCaption;

        super.open();
    }
}
