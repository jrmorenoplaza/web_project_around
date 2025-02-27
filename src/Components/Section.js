export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items = this._items) {
        console.log("Ejecutando renderItems");
        console.log("Lista de elementos a renderizar:", items);
        
        if (!Array.isArray(items) || items.length === 0) {
            console.error("Error: renderItems no recibió un array válido", items);
            return;
        }
    
        items.forEach((item, index) => {
            console.log(`🔹 Renderizando tarjeta ${index + 1}:`, item);
            this._renderer(item);
        });
    }
    

    addItem(element) {
        console.log("Agregando elemento al contenedor:", element);
        this._container.prepend(element);
    }
    
}