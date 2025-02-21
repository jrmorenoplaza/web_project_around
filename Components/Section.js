export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        console.log("Ejecutando renderItems");
        console.log("Lista de elementos a renderizar:", items);
        
        if (!Array.isArray(items)) {
            console.error("❌ Error: renderItems no recibió un array válido", items);
            return;
        }
    
        items.forEach(item => {
            this._renderer(item);
        });
    }
    

    addItem(element) {
        this._container.prepend(element);
    }
}