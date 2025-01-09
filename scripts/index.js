import Card from './card.js';
import FormValidator from './FormValidator.js';
import { 
    openPopup, 
    closePopup, 
    enableDeleteButtons, 
    disableDeleteButtons, 
    openZoomPopup, 
    closeZoomPopup 
} from './utils.js';

const validationConfig = {
    formSelector: '.popup__form, .add__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__save, .add__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const profileFormElement = document.querySelector('.popup__form');
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();

const addFormElement = document.querySelector('.add__form');
const addFormValidator = new FormValidator(validationConfig, addFormElement);
addFormValidator.enableValidation();

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameInput = document.querySelector('#name');
    const jobInput = document.querySelector('#about'); 
    const name = nameInput.value;
    const job = jobInput.value;
    const profileNameElement = document.querySelector('.profile__name');
    const profileJobElement = document.querySelector('.profile__dato');

    profileNameElement.textContent = name;
    profileJobElement.textContent = job;

    closePopup(document.querySelector('.popup'));
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    const profileNameElement = document.querySelector('.profile__name');
    const profileJobElement = document.querySelector('.profile__dato');
    document.querySelector('#name').value = profileNameElement.textContent;
    document.querySelector('#about').value = profileJobElement.textContent;

    openPopup(popup);
    disableDeleteButtons();
    profileFormValidator.resetValidation();
});

const closePopupButton = document.querySelector('.popup__close');
closePopupButton.addEventListener('click', () => closePopup(document.querySelector('.popup')));

const addButton = document.querySelector('.profile__add');
const addPopup = document.querySelector('.add');
const addCloseButton = document.querySelector('.add__close');

addButton.addEventListener('click', () => {
    openPopup(addPopup);
    disableDeleteButtons();
    addFormValidator.resetValidation();
});

addCloseButton.addEventListener('click', () => closePopup(addPopup));

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

function renderInitialCards(cards) {
    cards.forEach(cardData => {
        const card = new Card(cardData, '#card-template');
        const cardElement = card.getCard();
        const cardImage = cardElement.querySelector('.card__img'); 
        enableDeleteButtons(); 

        cardImage.addEventListener('click', () => {
            openZoomPopup(cardData.link, cardData.name, document.querySelector('.zoom-popup'));
        });
        
        cardContainer.appendChild(cardElement);
    });
}


renderInitialCards(initialCards);

addFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.querySelector('#place-name').value.trim();
    const urlInput = document.querySelector('#place-url').value.trim();

    if (nameInput && urlInput) {
        const newCard = new Card({ name: nameInput, link: urlInput }, '#card-template');
        const cardElement = newCard.getCard();
        const cardImage = cardElement.querySelector('.card__img'); // Asignar evento de zoom

        cardImage.addEventListener('click', () => {
            openZoomPopup(urlInput, nameInput, document.querySelector('.zoom-popup'));
        });

        cardContainer.prepend(cardElement);
        addFormElement.reset();
        closePopup(addPopup);
    }
});


const zoomPopup = document.querySelector('.zoom-popup');
const zoomPopupClose = document.querySelector('.zoom-popup__close');
const overlay = document.querySelector('.overlay');

zoomPopupClose.addEventListener('click', () => closeZoomPopup(zoomPopup));

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { 
        closeZoomPopup(zoomPopup);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const zoomPopup = document.querySelector('.zoom-popup:not(.hidden)');
        if (zoomPopup) closeZoomPopup(zoomPopup);
    }
});