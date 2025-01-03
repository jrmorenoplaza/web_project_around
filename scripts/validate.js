function showInputError(inputElement, config) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(config.errorClass);
        inputElement.classList.add(config.inputErrorClass);
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove(config.errorClass);
        inputElement.classList.remove(config.inputErrorClass);
    }

    const formElement = inputElement.closest(config.formSelector);
    toggleButtonState(formElement, config);
}


function toggleButtonState(formElement, config) {
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const inputElements = Array.from(formElement.querySelectorAll(config.inputSelector));
    const isFormValid = inputElements.every((input) => input.validity.valid && input.value.trim() !== '');
    
    if (isFormValid) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    }
}


function setEventListeners(formElement, config) {
    const inputElements = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            showInputError(inputElement, config);
            toggleButtonState(formElement, config);
        });
    });
}

function enableValidation(config) {
    const formElements = Array.from(document.querySelectorAll(config.formSelector));
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => e.preventDefault());
        setEventListeners(formElement, config);
        toggleButtonState(formElement, config);
    });
}

function resetFormValidation(formElement, config) {
    const inputElements = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputElements.forEach((inputElement) => {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(config.errorClass);
        inputElement.classList.remove(config.inputErrorClass);
    });

    toggleButtonState(formElement, config);
}

export { enableValidation, resetFormValidation };