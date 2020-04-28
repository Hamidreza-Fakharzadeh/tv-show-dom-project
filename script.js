//You can edit ALL of the code here
/* when page start to load, only setup(), make the page to load. Because window.onload
  call setup()    

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
*/
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

    //INPUT OF FORM
    const searchElem = document.createElement('input');
    formElem.appendChild(searchElem);
    searchElem.placeholder = 'Search...';
    searchElem.type = 'text';
    searchElem.name = 'search';

    //BUTTON SEARCH OF FORM
    const btnSearch = document.createElement('button');
    formElem.appendChild(btnSearch);
    btnSearch.type = 'submit';
    const btnIcon = document.createElement('i');
    btnSearch.appendChild(btnIcon);
    btnIcon.classList.add('fa');

    //CONTAINER
    const containerElm = document.getElementById('divContainer');
    rootElem.appendChild(containerElm);
    containerElm.classList.add('divContainerClass');

    var arrTitel = [];
    //console.log(arrTitel);
    //COLUMN OF ELEMENT

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
    searchElem.addEventListener('keyup', function(e) {
        const term = e.target.value.toUpperCase();
        console.log(term);
        const movies = document.getElementsByClassName('column');
        Array.from(movies).forEach(function(movie) {
            let titel = movie.firstElementChild.textContent;
            if (titel.toUpperCase().indexOf(term) != -1) {
                movie.style.display = 'block';
            } else {
                movie.style.display = 'none';
            }
        });
    });
}

window.onload = setup;