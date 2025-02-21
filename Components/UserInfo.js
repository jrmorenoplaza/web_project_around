export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector); // <--- Debe coincidir con el HTML
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            avatar: this._avatarElement.src
        };
    }

    setUserInfo({ name, about, avatar }) {
        if (this._nameElement) this._nameElement.textContent = name;
        if (this._aboutElement) this._aboutElement.textContent = about;
        if (this._avatarElement && avatar) this._avatarElement.src = avatar; // <--- Verifica que no sea null
    }
}
