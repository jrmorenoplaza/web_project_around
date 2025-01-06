class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputElements = Array.from(formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = formElement.querySelector(config.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
        inputElement.classList.add(this._config.inputErrorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        const isFormValid = this._inputElements.every(input => input.validity.valid && input.value.trim() !== '');
        if (isFormValid) {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        }
    }

    _setEventListeners() {
        this._inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => e.preventDefault());
        this._setEventListeners();
        this._toggleButtonState();
    }

    resetValidation() {
        this._inputElements.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}

export default FormValidator;
