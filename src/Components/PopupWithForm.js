import Popup from "../Components/popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector("form");
        this._inputList = this._form.querySelectorAll("input");
    }

    _getInputValues() {
        const inputValues = {};
        console.log("Valores recogidos del formulario:", inputValues);
        this._inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this._toggleLoading(true);

            this._handleFormSubmit(this._getInputValues())
                .then(() => this.close())
                .catch((err) => console.error("Error al enviar el formulario:", err))
                .finally(() => this._toggleLoading(false));
        });
    }
    
    _toggleLoading(isLoading) {
        const submitButton = this._form.querySelector(".popup__save, .add__save");

        if (isLoading) {
            this._defaultButtonText = submitButton.textContent;
            submitButton.textContent = "Guardando...";
            submitButton.disabled = true;
        } else {
            submitButton.textContent = this._defaultButtonText;
            submitButton.disabled = false;
        }
    }
    

    close() {
        super.close();
        this._form.reset();
    }
}
