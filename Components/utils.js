export const openPopup = (popup) => {
    popup.classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
};

export const closePopup = (popup) => {
    popup.classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
};

export const enableDeleteButtons = () => {
    const deleteButtons = document.querySelectorAll('.card__delete');
    deleteButtons.forEach((button) => {
        button.classList.remove('card__delete--hidden');
    });
};

export const disableDeleteButtons = () => {
    const deleteButtons = document.querySelectorAll('.card__delete');
    deleteButtons.forEach((button) => {
        button.classList.add('card__delete--hidden');
    });
};


