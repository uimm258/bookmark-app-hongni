const items = [];
const error = null;
const rating = "All";
const adding = false;
const filter = 0;


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

function setError(error){
    this.error = error;
};


export default {
    items,
    error,
    rating,
    adding,
    filter,
    findById,
    addItem,
    findAndDelete,
    findAndUpdate,
    setError,
}