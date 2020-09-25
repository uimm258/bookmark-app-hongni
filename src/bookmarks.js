import store from './store.js';

//set up the main page
function mainPages(){
    return `        
    <section id="main-page">
        <div class="first-page">
            <form class="add-new-bookmarks-forms">
                <button type="submit" id="js-add-new-button">+ New</button>

                <label id="js-filter">Filter</label>
                    <select name="filter" id="filter-by">
                        <option value="all">All</option>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                </select>
            </form>
        </div>
    </section>`;
};

//create bookmarks
function generateAddNewPage(bookmark){
    ratingHtmlString = '';
    for(let i = 1; i<= 5; i++){
        let checked = '';
        if(i === Number(rating) && store.edit === true){
            console.log(`checked condition met at ${i}`);
            checked = "checked"
        }
        ratingHtmlString += `<input type="radio" name="rating" class="js-add-rating" id="rating${i}" value="${i}" ${checked}>
        <label class="star" for="rating${i}"> <p>${i}</p> </label>`;
    }

    let createStructure = `
    <form class="js-add-new-form">
        <section class="add-url" data-item-id="${bookmark.id}">
            <label for="add-input">Add New Bookmark</label>
            <input type="text" name="url" class="js-add-new-url" placeholder="https://www.example.com" value="${bookmark.url}" required></input>
        </section>

        <section class="add-title">
            <input type="text" name="title" class="js-add-new-title" placeholder="Bookmark Title" value="${bookmark.title}" required></input>
        </section>

        <section class="add-rating">
            ${ratingHtmlString} 
        </section>

        <section class="add-desp">
            <input type="text" name="description" class="js-add-new-desp" placeholder="Description" value="${bookmark.desp}" required></input>
        </section>
    </form> `;

    return createStructure;
};

//render the page
function render(){
    if(!store.adding){
        $('main').html(mainPages());
    } else {
        $('main').html(generateAddNewPage());
    }
};

//ckeck if +new works
function handleNewBookmark(){
    $('.main-page').on('.click', '.js-add-new-button', event =>{
        store.adding = true;
        store.edit = false;
        render();
    });
}

function displayCurrentResult(){
    console.log(responseJson);
    $('#js-add-new-bookmarks').empty;

    let results = '';
    if(results.expended){
        responseJson.data.forEach(result => {
            results += `
            <li>
                <h3>$(result.title)</h3`
        })
    }

}

//
function generateFilteredBookmarks(bookmark){
    let filteredBookmarks = ' ';
    for(let i = 1; i < 5; i++){
        if(store.filter !== -1 && bookmark.rarting === store.filter){
            filteredBookmarks = bookmark.title
        }
        return filteredBookmarks;
    }
    render();
}



function bindEventListeners(){
    handleNewBookmark();
}

export default{
    bindEventListeners,
    render
};