/*import { enableValidation, resetFormValidation } from './validate.js';*/

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

const validationConfig = {
    formSelector: '.popup__form, .add__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__save, .add__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function disableDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.card__delete');
    deleteButtons.forEach((button) => {
        button.classList.add('card__delete--hidden');
    });
}

function enableDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.card__delete');
    deleteButtons.forEach((button) => {
        button.classList.remove('card__delete--hidden');
    });
}

let formElement = document.querySelector('.popup__form');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = document.querySelector('#name');
    let jobInput = document.querySelector('#about'); 
    let name = nameInput.value;
    let job = jobInput.value;
    let profileNameElement = document.querySelector('.profile__name');
    let profileJobElement = document.querySelector('.profile__dato');

    profileNameElement.textContent = name;
    profileJobElement.textContent = job;

    closeHidden();
}

formElement.addEventListener('submit', handleProfileFormSubmit);

const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const closePopupButton = document.querySelector('.popup__close');

const closeHidden = () => {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
    enableDeleteButtons();
};

closePopupButton.addEventListener('click', closeHidden);
overlay.addEventListener('click', closeHidden);

const editButton = document.querySelector('.profile__edit');

const openPopup = () => {
    popup.classList.remove('hidden');
    overlay.classList.remove('hidden');

    let profileNameElement = document.querySelector('.profile__name');
    let profileJobElement = document.querySelector('.profile__dato');
    document.querySelector('#name').value = profileNameElement.textContent;
    document.querySelector('#about').value = profileJobElement.textContent;

    toggleSaveButton();
    disableDeleteButtons();

    const profileForm = document.querySelector('.popup__form');
    resetFormValidation(profileForm, validationConfig);
};

const toggleSaveButton = () => {
    let nameInput = document.querySelector('#name');
    let jobInput = document.querySelector('#about');
    let saveButton = document.querySelector('.popup__save');

    if (nameInput.value.trim() !== '' && jobInput.value.trim() !== '') {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
};

document.querySelector('#name').addEventListener('input', toggleSaveButton);
document.querySelector('#about').addEventListener('input', toggleSaveButton);
toggleSaveButton();

editButton.addEventListener('click', openPopup);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
        closeHidden();
    }
});

const addButton = document.querySelector('.profile__add');
const addPopup = document.querySelector('.add');
const addCloseButton = document.querySelector('.add__close');
const addFormOverlay = document.querySelector('.overlay');

const openAddForm = () => {
    addPopup.classList.remove('hidden');
    addFormOverlay.classList.remove('hidden');
    toggleAddSaveButton();
    disableDeleteButtons();

    const addForm = document.querySelector('.add__form');
    resetFormValidation(addForm, validationConfig);
};


const closeAddForm = () => {
    addPopup.classList.add('hidden');
    addFormOverlay.classList.add('hidden');
    enableDeleteButtons();
};

const toggleAddSaveButton = () => {
    const nameInput = document.querySelector('#place-name');
    const urlInput = document.querySelector('#place-url');
    const saveButton = document.querySelector('.add__save');

    if (nameInput.value.trim() !== '' && urlInput.value.trim() !== '') {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
};

addButton.addEventListener('click', openAddForm);
addCloseButton.addEventListener('click', closeAddForm);
addFormOverlay.addEventListener('click', closeAddForm);

document.querySelector('#place-name').addEventListener('input', toggleAddSaveButton);
document.querySelector('#place-url').addEventListener('input', toggleAddSaveButton);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !addPopup.classList.contains('hidden')) {
        closeAddForm();
    }
});

toggleAddSaveButton();

const cardContainer = document.querySelector('.elements__card');

const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
];

function createCard(name, link) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card__header">
            <button class="card__delete" aria-label="Eliminar tarjeta"></button>
        </div>
        <img class="card__img" src="${link}" alt="${name}">
        <div class="card__content">
            <h3>${name}</h3>
            <label class="heart-checkbox">
                <input type="checkbox" class="heart-input">
                <img src="./images/Vector.png" alt="Heart" class="heart">
            </label>
        </div>
    `;

    const deleteButton = card.querySelector('.card__delete');
    deleteButton.addEventListener('click', () => {
        card.remove();
    });

    const cardImage = card.querySelector('.card__img');
    cardImage.addEventListener('click', () => {
        openZoomPopup(link, name);
    });

    return card;
}

function renderInitialCards(cards) {
    cards.forEach(cardData => {
        const newCard = createCard(cardData.name, cardData.link);
        cardContainer.appendChild(newCard);
    });
}

renderInitialCards(initialCards);

const addForm = document.querySelector('.add__form');
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#place-name').value.trim();
    const urlInput = document.querySelector('#place-url').value.trim();

    if (nameInput && urlInput) {
        const newCard = createCard(nameInput, urlInput);
        cardContainer.prepend(newCard); 
        addForm.reset();
        toggleAddSaveButton();
        closeAddForm();
    }
});

const zoomPopup = document.querySelector('.zoom-popup');
const zoomPopupImage = document.querySelector('.zoom-popup__image');
const zoomPopupClose = document.querySelector('.zoom-popup__close');

function openZoomPopup(imageSrc, imageAlt) {
    zoomPopupImage.src = imageSrc;
    zoomPopupImage.alt = imageAlt;

    const zoomPopupTitle = document.querySelector('.zoom-popup__title');
    zoomPopupTitle.textContent = imageAlt;

    zoomPopup.classList.remove('hidden');
    overlay.classList.remove('hidden');
    disableDeleteButtons();
}

function closeZoomPopup() {
    zoomPopup.classList.add('hidden');
    overlay.classList.add('hidden');
    zoomPopupImage.src = '';
    zoomPopupImage.alt = '';
    enableDeleteButtons();
}

zoomPopupClose.addEventListener('click', closeZoomPopup);
overlay.addEventListener('click', closeZoomPopup);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !zoomPopup.classList.contains('hidden')) {
        closeZoomPopup();
    }
});






