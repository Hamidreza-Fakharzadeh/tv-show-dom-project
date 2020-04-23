//You can edit ALL of the code here
function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
    const containerElm = document.getElementById('divContainer');
    rootElem.appendChild(containerElm);
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

        imgElem.src = episodeList[i].image.medium;

        let eleSummary = episodeList[i].summary;
        let peice = eleSummary.replace('<p>', ' ');
        summaryElem = peice.replace('</p>', ' ');
        paragraphElem.textContent = summaryElem;
    }
}

window.onload = setup;