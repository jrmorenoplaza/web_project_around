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

const addButton = document.querySelector('.profile__add');
const addPopup = document.querySelector('.add');
const addCloseButton = document.querySelector('.add__close');
const addFormOverlay = document.querySelector('.overlay');

const openAddForm = () => {
    addPopup.classList.remove('hidden');
    addFormOverlay.classList.remove('hidden');
    toggleAddSaveButton(); 
};

const closeAddForm = () => {
    addPopup.classList.add('hidden');
    addFormOverlay.classList.add('hidden');
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

document.querySelector('.add__name').addEventListener('input', toggleAddSaveButton);
document.querySelector('.add__url').addEventListener('input', toggleAddSaveButton);

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
