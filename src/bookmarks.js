import api from './api.js';
import store from './store.js';


function generateMainPage(){
    let mainPage = `
    <div class="first-page">
                <form class="add-new-bookmarks-forms" id="js-add-new-form">
                    <button id="js-add-new-button" class="css-add-new-button">+ New</button>

                    <section class="js-filter-by">
                        <label id="js-filter">Filter By</label>
                            <select name="filter" id='js-filter-rating'>
                                <option value="0">All</option>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                        </select>
                    </section>

                <section class="js-add-new-bookmark"></section>
            </form>
        </div>`;
    $('#main-page').html(mainPage);
}

//create a bookmark form
function generateAddNew(){
    return `
    <form class="js-add-new">
            <h2>Create a Bookmark</h2>
    
            <section class="add-url">
                <label for="add-new-url">Add New Bookmark</label>
                <input type="text" name="url" class="new-url" id="add-new-url" placeholder="https://www.example.com" required></input>
            </section>
    
            <section class="add-title">
                <label for="add-new-title">Add Title</label>
                <input type="text" name="title" class="new-title" id="add-new-title" placeholder="Bookmark Title" required></input>
            </section>
    
            <section class="add-rating">
                <label id="add-new-rating">Add Rating</label>
                    <select name="rating" id="add-new-rating" class="new-rating" required>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
            </section>
    
            <section class="add-description">
                <label for="add-new-description">Add Description</label>
                <input type="text" name="description" class="new-desp" id="add-new-description" placeholder="Description" required></input>
            </section>
    
            <div class="add-new-submit">
                <button type="submit" name="create-bookmark" class="create-bookmark-button-form-button">Create</button>
                <button type="button" name="cancel-bookmark" class="cancel-bookmark-button-form-button">Cancel</button>
            </div>
        </form> `;
};




//add new bookmarks to the form
function handleAddNewForm(){
    $('#js-add-new-button').on('click', event =>{
        event.preventDefault();
        store.adding = true;
        render();
    });
};




//submit new bookmark
function handleSubmitBookmarkForm(){
    $('#main-page').on('submit', '#js-add-new-form', event =>{
        event.preventDefault();
        
        const title = $('#add-new-title').val();
        const url = $('#add-new-url').val();
        const desp = $('#add-new-description').val();
        const rating = $('select#add-new-rating').val();


        api.createBookmark(title, url, desp, Number(rating))
            .then(newBookmark => {
                store.addItem(newBookmark);
                store.adding = false;
                store.error = null;
                render();
        })
        .catch(error => {
                store.setError(error.message);
                render();
        });
    });
}


//cancel to add new bookmark to the form
function handleCancelBookmarkForm(){
    $('#main-page').on('click', '.cancel-bookmark-button', event => {
        store.adding = false;
        store.error = null;
        render();
    })
}


//minimize and expand bookmarks that have been created
function generateExpanded(bookmark){
    if(bookmark.expanded){
        return `
        <li class="js-item-element" data-item-id="${bookmark.id}">
            <div class="bookmark-expanded">
                <h2 class="add-title">${bookmark.title}</h2>
                <h3 class="add-rating">Star: ${bookmark.rating}</h3>
                <p class="add-description">${bookmark.desp}</p>
                <a href="${bookmark.url}">Visit Site</a>
                <div class="bookmark-expand">
                    <button class="close-button" type="button">Close</button>
                    <button class="delete-button" type="button">Delete</button>
                </div>
            </div>
        <li>`;
    } else {
        return `
        <li class="js-item-element" data-item-id="${bookmark.id}">
            <div class="bookmark-not-expanded">
                <h2 class="add-title">${bookmark.title}</h2>
                <h3 class="add-rating">Star: ${bookmark.rating}</h3>
                <div class="bookmark-expand">
                    <button class="expand-button" type="button">Expand</button>
                    <button class="delete-button" type="button">Delete</button>
                </div>
            </div>
        <li>`;
    }
};


//expand the bookmark
function handleExpand(){
    $('.js-bookmarks').on('click', '.expand-button', event => {
        const id = getBookmarkIdFromElement(event.currentTarget);
        const item = store.findById(id);
        const itemObj = { expanded: !item.expanded };
        store.findAndUpdate(id, itemObj);
        render();
    });
};


//close expanded bookmarks
function handleClose(){
    $('.js-bookmarks').on('click', '.close-button', event => {
        const id = getBookmarkIdFromElement(event.currentTarget);
        const bookmarkID = store.items.find(item => item.id === id);
        bookmarkID.expanded = false;
        render();
    });
};


//delete bookmarks
function handleDelete(){
    $('.js-bookmarks').on('click', '.delete-button', event =>{
        const id = getBookmarkIdFromElement(event.currentTarget);
        api.deleteBookmark(id)
            .then(() => {
            store.findAndDelete(id);
            render();
        });
    });
};




function handleFilter(){
    $('.js-filter-by').on('change', '#js-filter-rating', event => {
        const displayRating = $('#js-filter-rating').val();
        console.log(displayRating);
        store.filteredItems(displayRating);
        render();
    });
};


//store all bookmakes in an array
function generateBookmarkString(bookmarkList){
    const items = bookmarkList.map(bookmark => generateExpanded(bookmark)
    );
    return items.join(' ');
};


//create id for each bookmarks for filter
function getBookmarkIdFromElement(bookmark){
    return $(bookmark)
        .closest('li')
        .data('item-id');
};


//render all
function render(){


    if(store.adding){
        $('.js-add-new-bookmark').html(generateAddNew());
    } else {
        $('.js-add-new-bookmark').empty();
    }




   


    const items = [...store.items];
    const bookmarkStrings = generateBookmarkString(store.items);
    $('.js-bookmarks').html(bookmarkStrings);


    //doesn't filter
    if(store.filter){
        const displayRating = $('#js-filter-rating').val();
        const htmlStrings=generateBookmarkString(store.filteredItems(displayRating));
        $('.js-bookmarks').html(htmlStrings);
    }


};


function bindEventListeners(){
    generateMainPage();
    handleAddNewForm();
    handleSubmitBookmarkForm();
    handleCancelBookmarkForm();
    handleExpand();
    handleClose();
    handleDelete();
    handleFilter();
};


export default {
    bindEventListeners,
    render
};