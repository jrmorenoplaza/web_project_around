import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._handleSubmit = null;
    }

    setSubmitAction(action) {
        this._handleSubmit = action;
    }

    open() {
        console.log("Abriendo popup de confirmación...");
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (this._handleSubmit) {
                this._handleSubmit();
            }
        });
    }
}
