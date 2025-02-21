import Card from '../Components/card.js';
import FormValidator from '../Components/FormValidator.js';
import Section from '../Components/Section.js';
import Popup from '../Components/popup.js';
import PopupWithImage from '../Components/PopupWithImage.js';
import PopupWithForm from "../Components/PopupWithForm.js";
import UserInfo from "../Components/UserInfo.js";

const validationConfig = {
    formSelector: '.popup__form, .add__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__save, .add__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    aboutSelector: ".profile__dato",
    avatarSelector: ".profile__image"
});

const profilePopupWithForm = new PopupWithForm(".popup", (formData) => {
    userInfo.setUserInfo(formData);
});
profilePopupWithForm.setEventListeners();

const addCardPopupWithForm = new PopupWithForm(".add", (formData) => {
    const newCard = new Card(
        { name: formData["place-name"], link: formData["place-url"] },
        "#card-template",
        handleCardClick 
    );
    document.querySelector(".elements__card").prepend(newCard.getCard());
});
addCardPopupWithForm.setEventListeners();

const profileFormElement = document.querySelector('.popup__form');
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();

const addFormElement = document.querySelector('.add__form');
const addFormValidator = new FormValidator(validationConfig, addFormElement);
addFormValidator.enableValidation();

const zoomPopupInstance = new PopupWithImage('.zoom-popup');
zoomPopupInstance.setEventListeners();

function handleCardClick(imageUrl, imageCaption) {
    zoomPopupInstance.open(imageUrl, imageCaption);
}

const cardSection = new Section({
    renderer: (cardData) => {
        const card = new Card(cardData, '#card-template', handleCardClick);
        cardSection.addItem(card.getCard());
    }
}, '.elements__card');

function fetchCards() {
    fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
        method: "GET",
        headers: {
            Authorization: "6fdd9345-6378-4693-86e9-66ccfae37409",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(cards => {
        console.log("Tarjetas obtenidas de la API:", cards);
        cardSection.renderItems(cards); // Ahora renderItems() usa el parámetro en lugar de this._items
    })
    .catch(error => {
        console.error("Error al obtener las tarjetas:", error);
        alert("Hubo un problema al cargar las tarjetas.");
    });
}

fetchCards();

const editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', () => {
    const userInfoData = userInfo.getUserInfo();
    document.querySelector('#name').value = userInfoData.name;
    document.querySelector('#about').value = userInfoData.about;

    profilePopupWithForm.open();
    profileFormValidator.resetValidation();
});

const addButton = document.querySelector('.profile__add');
addButton.addEventListener('click', () => {
    addCardPopupWithForm.open();
    addFormValidator.resetValidation();
});  

function fetchUserInfo() {
    
    return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
        method: "GET",
        headers: {
            Authorization: `6fdd9345-6378-4693-86e9-66ccfae37409`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        userInfo.setUserInfo({
            name: data.name,
            about: data.about,
            avatar: data.avatar
        });
    })
    .catch(error => {
        console.error("Error al obtener datos del usuario:", error);
        alert("Hubo un problema al cargar los datos del usuario.");
    });
}

fetchUserInfo();

document.querySelector("#card-template")

document.querySelector(".elements__card")

document.querySelector(".profile__image")
