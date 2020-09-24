const items = [];
const error = null;
const filter = false;
const adding = false;
const edit = false;
const filteredBookmarks = [];

function findById(id){
    return this.items.find(currentItem => currentItem.id === id);
};

function addItem(item){
    let expandedObject = {
        expanded: false
    }; 

    Object.assign(item, expandedObject);
    this.items.push(item);
};

function findAndDelete(id){
    this.items = this.items.filter(currentItem => currentItem.id != id);
};

function findAndUpdate(id, newData){
    const currentItem = this.findById(id);
    Object.assign(currentItem, newData);
};

export default{
    items,
    error,
    filter,
    adding,
    filteredBookmarks,
    findById,
    addItem,
    findAndDelete,
    findAndUpdate,
}