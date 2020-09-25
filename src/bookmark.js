import api from './api.js';
import store from './store.js';

const title = $('#add-new-title').val();
const url = $('#add-new-url').val();
const desc = $('#add-new-description').val();
const rating = $('#add-new-rating').val();

//create a bookmark form
function generateAddNew(){
    return `
    <form class="js-add-new-form">
        <h2>Create a Bookmark</h2>

        <section class="add-url">
            <label for="add-new-url">Add New Bookmark</label>
            <input type="text" name="url" class="js-add-new-url" placeholder="https://www.example.com" required></input>
        </section>

        <section class="add-title">
            <label for="add-new-title">Add Title</label>
            <input type="text" name="title" class="js-add-new-title" placeholder="Bookmark Title" required></input>
        </section>

        <section class="add-rating">
            <label for="add-new-rating>Add Rating</label>
            <input type="number" id="bookmark-rating" name="rating" value=5 required>
            <input type="number" id="bookmark-rating" name="rating" value=4 required>
            <input type="number" id="bookmark-rating" name="rating" value=3 required>
            <input type="number" id="bookmark-rating" name="rating" value=2 required>
            <input type="number" id="bookmark-rating" name="rating" value=1 required>
        </section>

        <section class="add-desp">
            <label for="add-new-description">Add Description</label>
            <input type="text" name="description" class="js-add-new-desp" placeholder="Description" required></input>
        </section>

        <div class="add-new-submit">
            <button type="submit" name="create-bookmark" class="create-bookmark-button form-button">CREATE</button>
            <button type="button" name="cancel-bookmark" class="cancel-bookmark-button form-button">Cancel</button>
        </div>
    </form> `;
};

//add new bookmarks to the form
function handleAddBookmarkForm(){
    $('.main-page').on('submit', '#js-add-new-form', event =>{
        event.preventDefault();

        api.createBookmark(title, url, desc, rating)
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
};

//cancel to add new bookmark to the form
function handleCancelBookmarkForm(){
    $('.main-page').on('click', '.cancel-bookmark-button', event => {
        store.adding = false;
        store.error = null;
        render();
    })
}

//minimize and expand bookmarks that have been created
function generateExpanded(bookmark){
    if(bookmark.expanded){
        return `
        <li class="js.item-element" data-item-id="${bookmark.id}">
            <div class="bookmark-expanded">
                <h2 class="add-title">${bookmark.title}</h2>
                <p class="add-description">${bookmark.desc}</p>
                <h3 class="add-rating">Star: ${bookmark.rating}</h3>
                <a href="${bookmark.url}">Visit Site</a>
                <div class="bookmark-expand">
                    <button class="close-button" type="button">Close</button>
                    <button class="delete-button" type="button">Delete</button>
                </div>
            </div>
        <li>`;
    } else {
        return `
        <li class="js.item-element" data-item-id="${bookmark.id}">
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

//store all bookmakes in an array
function generateBookmarkString(bookmarkList){
    const items = bookmarkList.map(bookmark => generateExpanded(bookmark)
    );
    return items.join(' ');
};

//create id for each bookmarks for filter
function getBookmarkIdFromElement(bookmark){
    return $(bookmark)
        .closest('.js-item.element')
        .data('item-id');
};

//expand the bookmark whenever click "expend"
function handleExpand(){
    $('.js-bookmarks').on('click', '.expand-button', event => {
        const id = getBookmarkIdFromElement(event.currentTarget);
        const bookmarkID = $(event.currentTarget).find(item => item.id === id);
        bookmarkID.expanded = true;
        render();
    });
};

//close expanded bookmarks
function handleClose(){
    $('.js-bookmarks').on('click', '.expand-button', event => {
        const id = getBookmarkIdFromElement(event.currentTarget);
        const bookmarkID = $(event.currentTarget).find(item => item.id === id);
        bookmarkID.expanded = false;
        render();
    });
};

//delete bookmarks
function handleDelete(){
    $('.js-bookmarks').on('click', '.delete-botton', event =>{
        const id = getBookmarkIdFromElement(event.currentTarget);
        api.deleteItem(id)
            .then(() => {
            store.findAndDelete(id);
            render();
         })
        .catch((error) => {
            console.log(error);
            store.setError(error.message);
            renderError();
        });
    });
};

//generate error messages
function generateError(message){
    return `
    <section class="error-content">
      <button id="cancel-error">X</button>
      <p>${message}</p>
    </section>`;
};

//render all
function render(){
    if (store.error.message) {
        const el = generateError(store.error);
        $('main').append(store.error.message);
    } else {
        $('main').empty();
    }

    // filter item list
    let items = [...store.items];
    if (store.filteredItems) {
        items = items.filter(item => !item.checked);
    }


    const bookmarkStrings = generateBookmarkString(items);
    $('.js-bookmarks').html(bookmarkStrings);


    if(store.adding){
        $('.js-add-new-form').html(generateAddNew());
    } 
};

function bindEventListeners(){
    handleAddBookmarkForm();
    handleCancelBookmarkForm()
    handleExpand();
    handleClose();
    handleDelete();
};

export default {
    bindEventListeners,
    render
};