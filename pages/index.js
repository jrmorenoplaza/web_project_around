import Card from '../Components/card.js';
import FormValidator from '../Components/FormValidator.js';
import Section from '../Components/Section.js';
import Popup from '../Components/popup.js';
import PopupWithImage from '../Components/PopupWithImage.js';
import PopupWithForm from "../Components/PopupWithForm.js";
import PopupWithConfirmation from "../Components/PopupWithConfirmation.js";
import UserInfo from "../Components/UserInfo.js";
import Api from "../Components/api.js";

const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");
confirmPopup.setEventListeners();

function handleDeleteClick(cardId, cardElement) {
    confirmPopup.setSubmitAction(() => {
        api.deleteCard(cardId)
            .then(() => {
                cardElement.remove();
                confirmPopup.close();
            })
            .catch(error => console.error("Error al eliminar la tarjeta:", error));
    });

    confirmPopup.open();
}


const validationConfig = {
    formSelector: '.popup__form, .add__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__save, .add__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        Authorization: "6fdd9345-6378-4693-86e9-66ccfae37409",
        "Content-Type": "application/json"
    }
});

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    aboutSelector: ".profile__dato",
    avatarSelector: ".profile__image"
});

const profilePopupWithForm = new PopupWithForm(".popup", (formData) => {
    api.updateUserInfo(formData["name"], formData["about"])
        .then(() => {
            userInfo.setUserInfo({
                name: formData["name"],
                about: formData["about"]
            });
            profilePopupWithForm.close();
        })
        .catch(error => console.error("Error al actualizar el perfil:", error));
});
profilePopupWithForm.setEventListeners();

const addCardPopupWithForm = new PopupWithForm(".add", (formData) => {
    api.addCard(formData["place-name"], formData["place-url"])
        .then(newCardData => {
            const newCard = new Card(
                { name: newCardData.name, link: newCardData.link, _id: newCardData._id },
                "#card-template",
                handleCardClick
            );
            document.querySelector(".elements__card").prepend(newCard.getCard());
            addCardPopupWithForm.close();
        })
        .catch(error => console.error("Error al añadir la tarjeta:", error));
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
    items: [],
    renderer: (cardData) => {
        const card = new Card(cardData, '#card-template', handleCardClick, handleDeleteClick);
        cardSection.addItem(card.getCard());
    }
}, '.elements__card');

api.getCards()
    .then(cards => {
        cardSection._items = cards;
        cardSection.renderItems(cards);
    })
    .catch(error => {
        console.error("Error al obtener las tarjetas:", error);
        alert("Hubo un problema al cargar las tarjetas.");
    });

api.getUserInfo()
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
