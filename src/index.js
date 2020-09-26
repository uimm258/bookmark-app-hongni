
import store from './store.js';
import api from './api.js';
import bookmarks from './bookmarks.js';




function main(){
    api.readBookmark()
        .then((items) => {
            items.forEach(element => store.items.push(element));
        });

    bookmarks.bindEventListeners();
    bookmarks.render();
};

$(main);