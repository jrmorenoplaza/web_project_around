const editbutton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup__hidden');
const overlay = document.querySelector('.overlay__hidden');
const closepopupbutton = document.querySelector('.popup__close');

const openPopup = () => {
    popup.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeHidden = () => {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
};

editbutton.addEventListener('click', openPopup); 
closepopupbutton.addEventListener('click', closeHidden); 
overlay.addEventListener('click', closeHidden);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
        closeHidden();
    }
});