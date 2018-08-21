document.getElementById('searchform').addEventListener('submit', imageSearchHandler);
window.onpopstate = () => router();

//initializes to search:
router();

//should return html to render:
function router() {
    url = window.location.pathname;
    //get tag from browser url:
    let urlstring = "" + url;
    let tag = ("" + window.location.pathname).split("/")[1];
    if (urlstring.match(/^\/\w*$/)) {
        //render images:
        getPhotosByTag(tag)
            .then(renderimageList)
            .catch(function (err) {
                console.warn(err);
            });
    } else if (urlstring.match(/^\/\w*\/[0-9]*$/)) {
        getPhotosByTag(tag)
            .then(renderImage)
            .catch(function (err) {
                console.warn(err);
            });
    }

}

function imageSearchHandler(event) {
    event.preventDefault();
    window.history.pushState({}, window.location.pathname, window.location.origin + "/" + event.target.sok.value);
    router();
}

function getPhotosByTag(tag) {
    return fetch('/sok?tag=' + tag).then(function (response) {
        return response.json();
    });
}

function renderimageList(data) {
    let HTML = '';
    data.forEach((element, index) => {
        HTML +=
            `<figure>
                <a href=${window.location.pathname}/${index}><img src=${element.url}></img></a>
                <figcaption>${element.title}</figcaption>
            </figure>`;
    });
    let main = document.querySelector("main");
    main.innerHTML = HTML;
}

function renderImage(data) {
    let HTML = '';
    let split = ("" + window.location.pathname).split("/");
    let tag = split[1];
    let index = split[2];
    HTML += `<figure class="fullwidth">
                <img src=${data[index].url}></img>
                <figcaption>${data[index].title}</figcaption>
            </figure>`;
    let main = document.querySelector("main");
    main.innerHTML = HTML;
}