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

export const openZoomPopup = (imageSrc, imageAlt, zoomPopup) => {
    const zoomPopupImage = zoomPopup.querySelector('.zoom-popup__image');
    const zoomPopupTitle = zoomPopup.querySelector('.zoom-popup__title');

    zoomPopupImage.src = imageSrc;
    zoomPopupImage.alt = imageAlt;
    zoomPopupTitle.textContent = imageAlt;

    openPopup(zoomPopup);
    disableDeleteButtons();
};

export const closeZoomPopup = (zoomPopup) => {
    const zoomPopupImage = zoomPopup.querySelector('.zoom-popup__image');
    
    zoomPopupImage.src = '';
    zoomPopupImage.alt = '';

    closePopup(zoomPopup);
    enableDeleteButtons();
};

