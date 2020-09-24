import store from './store.js';

//set up the main page
function mainPages(){
    return `        
    <section id="main-page">
        <div class="first-page">
            <form class="add-new-bookmarks-forms">
                <button type="submit" id="js-add-new-button">+ New</button>

                <label id="js-ratings">Filter</label>
                    <select name="ratings" id="rate">
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

// create bookmarks
function generateAddNewPage(){
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
        <section class="add-url">
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
    $('main').on('.click', '.js-add-new-button', event =>{
        store.adding = true;
        store.edit = false;
        render();
    });
}



function bindEventListeners(){
    handleNewBookmark();
}

export default{
    bindEventListeners,
    render
};