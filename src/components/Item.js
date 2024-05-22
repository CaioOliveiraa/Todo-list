class Item {
    static getLastId() {
        const lastId = localStorage.getItem('lastId');
        return lastId ? parseInt(lastId, 10) : 0;
    }

    static setLastId(id) {
        localStorage.setItem('lastId', id);
    }

    constructor(text) {
        this.id = Item.getLastId() + 1;
        Item.setLastId(this.id);
        this.text = text;
        this.done = false;
    }
}

export default Item;
