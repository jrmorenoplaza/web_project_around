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
    aboutSelector: ".profile__dato"
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

const initialCards = [
    { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
    { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
    { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = new Card(cardData, '#card-template', handleCardClick);
        cardSection.addItem(card.getCard());
    }
}, '.elements__card');

cardSection.renderItems();

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
