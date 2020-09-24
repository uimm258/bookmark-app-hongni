
import store from './store.js';
import api from './api.js';
import bookmarks from './bookmarks.js';




function main(){
    bookmarks.bindEventListeners();
};

$(main);