const cardCtn = document.getElementById('optionCtn');
const searchBox = document.getElementById('inputTag');

function setup() {
    //const allEpisodes = getAllEpisodes();
    //makePageForEpisodes(allEpisodes);
    //search(allEpisodes);
    //selectBox(allEpisodes);
}

function search(allMovies) {
    searchBox.addEventListener('input', () => {
        //let inputValue = e.target.value.toLowerCase();
        let searchInput = searchBox.value;
        let getSearch = allMovies.filter(movie =>
            movie.name.toLowerCase().indexOf(searchInput) != -1 ||
            movie.summary.toLowerCase().indexOf(searchInput) != -1 ?
            true :
            false
        );
        makePageForEpisodes(getSearch);
    });
}

function selectBox(moviesAll) {
    let selectBoxShow = document.getElementById('selectTag2');
    selectBoxShow.innerHTML = `<option>All shows</option>`;
    moviesAll.forEach(
        movie =>
        (selectBoxShow.innerHTML += `<option>${cardHeader(movie)}</option>`)
    );
    selectBoxShow.addEventListener('click', () => {
        let objSelect = moviesAll.filter(movie =>
            selectBoxShow.value.indexOf(movie.name) != -1 ? true : false
        );
        makePageForEpisodes(objSelect);
    });
}

function removeTag() {}

function makePageForEpisodes(episodeList) {
    cardCtn.innerHTML = '';
    episodeList.forEach(episode => {
        cardCtn.innerHTML += `
    <div class ="xl-col-3 lg-col-3 md-col-6 sm-col-12">
      <div class ="cardClass">
       <h1>${cardHeader(episode)}</h1>
       <img src ="${episode.image.medium}"/>
       <p>${episode.summary}</p>
       </div>
    </div>`;
    });
}

function cardHeader(episode) {
    let name = episode.name;
    let numSeason = episode.season;
    if (numSeason < 10) {
        numSeason = '0' + numSeason;
    }
    let numEpisode = episode.number;
    if (numEpisode < 10) {
        numEpisode = '0' + numEpisode;
    }
    return 'S' + numSeason + 'E' + numEpisode + ' ' + name;
}
let idShow = 82;
fetch('https://api.tvmaze.com/shows/82/episodes')
    .then(response => response.json())
    .then(dataJson => {
        makePageForEpisodes(dataJson);
        search(dataJson);
        selectBox(dataJson);
    });

//     const rootElem = document.getElementById('root');
//     //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

//     //LIST ELEMENT
//     function listEpisodes() {
//         const selectTag2 = document.getElementById('selectTag2');
//         for (let i = 0; i < episodeList.length; i++) {
//             let optionElm = document.createElement('option');
//             selectTag2.appendChild(optionElm);
//             optionElm.innerText =
//                 'S0' +
//                 episodeList[i].season +
//                 'E0' +
//                 episodeList[i].number +
//                 ' ' +
//                 '-' +
//                 ' ' +
//                 episodeList[i].name;
//         }
//     }
//     listEpisodes();

//     //DISPLY NUMBER OF MOVIES LABLE
//     function displyNumberOfMovies() {
//         let numApi = episodeList.length;
//         const lableTag = document.getElementById('lableTag');
//         lableTag.innerHTML = numApi + '/' + ' ' + numApi + ' ' + 'Episodes';
//     }
//     displyNumberOfMovies();

//     //SEARCH ELEMENT
//     // function searchEpisode() {
//     //     const inputTag = document.getElementById('inputTag');
//     // }
//     //DISPLAY MOVIES
//     function displayMovies() {
//         const optionCtn = document.getElementById('optionCtn');
//         for (let i = 0; i < episodeList.length; i++) {
//             let divElem = document.createElement('div');
//             divElem.className = 'col-12 sm-col-12 md-col-6 lg-col-4 xl-col-4';
//             optionCtn.appendChild(divElem);
//             const cardFrame = document.createElement('div');
//             divElem.appendChild(cardFrame);
//             cardFrame.className = 'eachCard';
//             let h1Elem = document.createElement('h1');
//             let h1Append = cardFrame.appendChild(h1Elem);
//             h1Elem.className = 'h1Class';
//             let imgElem = document.createElement('img');
//             let imgAppend = cardFrame.appendChild(imgElem);
//             let paragraphElem = document.createElement('p');
//             let paragraphAppend = cardFrame.appendChild(paragraphElem);
//             h1Elem.textContent =
//                 episodeList[i].name +
//                 ' ' +
//                 '-' +
//                 ' ' +
//                 'S0' +
//                 episodeList[i].season +
//                 'E0' +
//                 episodeList[i].number;

//             imgElem.src = episodeList[i].image.medium;

//             let eleSummary = episodeList[i].summary;
//             let peice = eleSummary.replace('<p>', ' ');
//             summaryElem = peice.replace('</p>', ' ');
//             paragraphElem.textContent = summaryElem;
//         }
//     }
//     displayMovies();

//     function clickMovie(e) {
//         let term = e.target.value.toUpperCase();
//         let lableSearch = document.getElementById('lableTag');
//         const movies = document.getElementsByClassName('eachCard');
//         let arrSearch = [];
//         Array.from(movies).forEach(function(movie) {
//             let titel = movie.firstElementChild.textContent;
//             if (titel.toUpperCase().indexOf(term) != -1) {
//                 arrSearch.push(titel);
//                 let lenthSearch = arrSearch.length;
//                 movie.style.display = 'block';
//                 lableSearch.value =
//                     lenthSearch + ' ' + '/' + ' ' + numEpi + ' ' + 'Episodes';
//             } else {
//                 movie.style.display = 'none';
//             }
//         });
//     }

//     function inputListenerCall() {
//         let getNodInput = document.getElementById('inputTag');
//         getNodInput.addEventListener('keyup', clickMovie);
//     }
//     inputListenerCall();
// }

window.onload = setup();