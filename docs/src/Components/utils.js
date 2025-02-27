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


