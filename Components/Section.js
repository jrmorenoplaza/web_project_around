export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        console.log("Ejecutando renderItems"); // Debugging
        console.log("Lista de elementos a renderizar:", this._items);
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}