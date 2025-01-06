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
