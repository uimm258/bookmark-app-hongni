// global variable for api
const baseUrl = 'https://thinkful-list-api.herokuapp.com/hongni/bookmarks'

// build CRUD
// build fetch
function listApiFetch(...args){
    let error;
    return fetch(...args)
        .then(res => {
            if(!res.ok){
                error = {code: res.status};
            }
            
            if(!res.headers.get('content-type').includes('json')){
                error.message = res.statusText;
                return Promise.reject(error);
            }
            return res.json();
        })
        .then(data => {
            if(error){
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        })
};

//build create
function createBookmark(title, url, desp, rating){
    let newBookmark = {
        'title': title,
        'url': url,
        'desp': desp,
        'rating':rating

    }

    return listApiFetch(`${baseUrl}`, {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBookmark)
    });
};

//build read
function readBookmark(){
    return listApiFetch(`${baseUrl}`);
};

//build update
function updateBookmark(id, updateData){
    return listApiFetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateData)
    });
};

//build delet3e
function deleteBookmark(id){
    return listApiFetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        header: {'Content-Type': 'application/json'},
    })
};

export default {
    createBookmark,
    readBookmark,
    updateBookmark,
    deleteBookmark
};