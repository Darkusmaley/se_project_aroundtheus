export default class Section {
    constructor({items, renderer},containerSelector){
        this._containerSelector = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    }

    renderItems(){
        this._items.array.forEach(item => {
            this._renderer(item);
        });
    };

    addItems(item){
        this._containerSelector.append(item);
    };
}