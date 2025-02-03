export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._overlay = document.querySelector('.overlay');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _toggleDeleteButtons(disable) {
        const deleteButtons = document.querySelectorAll('.card__delete');
        deleteButtons.forEach(button => {
            button.disabled = disable;
        });
    }

    open() {
        this._popup.classList.remove("hidden");
        this._popup.classList.add("opened");
        this._overlay.classList.remove("hidden");
        this._overlay.classList.add("opened");
        document.addEventListener("keydown", this._handleEscClose);
        this._toggleDeleteButtons(true);
    }

    close() {
        this._popup.classList.add("hidden");
        this._popup.classList.remove("opened");
        this._overlay.classList.add("hidden");
        this._overlay.classList.remove("opened");
        document.removeEventListener("keydown", this._handleEscClose);
        this._toggleDeleteButtons(false);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("popup__close") ||
                event.target.closest(".popup__close") ||
                event.target.classList.contains("add__close") ||
                event.target.closest(".add__close") ||
                event.target.classList.contains("zoom-popup__close") ||
                event.target.closest(".zoom-popup__close") ||
                event.target === this._popup ||
                event.target === this._overlay
            ) {
                console.log("Cerrando popup...");
                this.close();
            }
        });

        this._overlay.addEventListener("click", () => {
            this.close();
        });
    }
    
}
