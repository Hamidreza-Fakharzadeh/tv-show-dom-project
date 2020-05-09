function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById('root');
    //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

    //FORM ELEMENT
    const formElem = document.createElement('form');
    rootElem.appendChild(formElem);
    formElem.classList.add('divContainerClass');
    formElem.action = '';

    //SELECT LIST
    const selectElem = document.createElement("select");
    formElem.appendChild(selectElem);

    //INPUT OF FORM
    const searchElem = document.createElement('input');
    searchElem.setAttribute("id", "searchField");
    formElem.appendChild(searchElem);
    searchElem.placeholder = 'Search...';
    searchElem.type = 'text';
    searchElem.name = 'search';


    const h1ShowingEpiNum = document.createElement("h3");
    formElem.appendChild(h1ShowingEpiNum);

    //CONTAINER
    const containerElm = document.getElementById('divContainer');
    rootElem.appendChild(containerElm);
    containerElm.classList.add('divContainerClass');

    var arrTitel = [];

    //DISPLAY MOVIES
    for (let i = 0; i < episodeList.length; i++) {
        let divElem = document.createElement('div');
        divElem.classList.add('column');
        containerElm.appendChild(divElem);
        let h1Elem = document.createElement('h1');
        let h1Append = divElem.appendChild(h1Elem);
        let imgElem = document.createElement('img');
        let imgAppend = divElem.appendChild(imgElem);
        let paragraphElem = document.createElement('p');
        let paragraphAppend = divElem.appendChild(paragraphElem);
        h1Elem.textContent =
            episodeList[i].name +
            ' ' +
            '-' +
            ' ' +
            'S0' +
            episodeList[i].season +
            'E0' +
            episodeList[i].number;
        arrTitel.push(h1Elem.textContent);

        imgElem.src = episodeList[i].image.medium;

        let eleSummary = episodeList[i].summary;
        let peice = eleSummary.replace('<p>', ' ');
        summaryElem = peice.replace('</p>', ' ');
        paragraphElem.textContent = summaryElem;
    }

    //CALL BACK FUNCTION SELLECT MOVIE
    function selectMovie(e) {

        let term = e.target.value.toUpperCase();
        const movies = document.getElementsByClassName('column');
        let arrSearch = [];
        Array.from(movies).forEach(movie => {
            let titel = movie.firstElementChild.textContent;
            if (titel.toUpperCase().indexOf(term) != -1) {
                arrSearch.push(titel);
                let lenthSearch = arrSearch.length;
                movie.style.display = 'block';
                h1ShowingEpiNum.textContent = lenthSearch + " " + "/" + " " + numEpi + " " + "Episodes"
            } else {
                movie.style.display = 'none';
            }

        })
    }
    //SEARCH EVENT LISTENER AND NUMBER OF MOVIES TO SHOW
    let numEpi = episodeList.length
    h1ShowingEpiNum.innerHTML = numEpi + "/" + " " + numEpi + " " + "Episodes"
    searchElem.addEventListener('input', selectMovie);

    //SELCTCT EVENT LISTENER


    //DISPLAY SELECT LIST
    for (let i = 0; i < episodeList.length; i++) {
        let optionElm = document.createElement('option');
        selectElem.appendChild(optionElm);
        optionElm.innerText = 'S0' +
            episodeList[i].season +
            'E0' +
            episodeList[i].number +
            ' ' + '-' + ' ' +
            episodeList[i].name;

    }

}

window.onload = setup()