export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.remove("hidden");
        this._popup.classList.add("opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.add("hidden");
        this._popup.classList.remove("opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener("click", (event) => {
            if (
                event.target === this._popup ||
                event.target.classList.contains("popup__close") ||
                event.target.classList.contains("add__close")
            ) {
                this.close();
            }
        });
    }
}
