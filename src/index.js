
import store from './store.js';
import api from './api.js';
import bookmark from './bookmark.js';




function main(){
    api.readBookmark()
        .then((items) => {
            items.forEach(element => store.adding(element));
            //bookmark.render();
        });

    bookmark.bindEventListeners();
    //bookmark.render();
};

$(main);