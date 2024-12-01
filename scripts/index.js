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
const overlay = document.querySelector('.overlay__hidden');
const closePopupButton = document.querySelector('.popup__close');

const closeHidden = () => {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
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
