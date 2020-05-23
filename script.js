const cardCtn = document.getElementById('optionCtn');
const searchBox = document.getElementById('inputTag');
const selectShow = document.getElementById('selectTag1');
const lableNum = document.getElementById("lableTag");

function setup() {
    let showsAllMovies = getAllShows();
    selectFetching(showsAllMovies);
    makePageForEpisodes(showsAllMovies)
}

function selectFetching(listArr) {
    selectShow.innerHTML = `<option>All Show</option>`;
    listArr.forEach(
        listObj =>
        (selectShow.innerHTML += `<option value = "${listObj.id}">${listObj.name}</option>`)
    );
    selectShow.addEventListener('change', e => {
        let getSelect = e.target.value;
        fetchId(getSelect);
    });
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
    selectBoxShow.innerHTML = `<option>All Episodes</option>`;
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
        let episodeText = episode.summary.replace(/<p>/g, ' ');
        let episodeText2 = episodeText.replace(/<\/p>/g, ' ');
        cardCtn.innerHTML += `
    <div class ="xl-col-3 lg-col-3 md-col-6 sm-col-12">
      <div class ="cardClass">
       <h1>${cardHeader(episode)}</h1>
       <img src ="${episode.image.medium}"/>
       <p>${episodeText2}</p>
       </div>
    </div>`;
    });
    lableNum.innerHTML = `${episodeList.length} Episodes`;
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

function fetchId(idShow) {
    fetch(`https://api.tvmaze.com/shows/${idShow}/episodes`)
        .then(response => response.json())
        .then(dataJson => {
            makePageForEpisodes(dataJson);
            search(dataJson);
            selectBox(dataJson);
        });
}




window.onload = setup();