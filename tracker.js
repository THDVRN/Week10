class Anime {
    constructor(title, studio) {
        this.title = title;
        this.studio = studio;
    }
}

class Season {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.animes = [];
    }

    addMember(anime) {
        this.animes.push(anime);
    }

    deleteMember(anime) {
        let index = this.animes.indexOf(anime);
        this.animes.splice(index, 1);
    }
}

let seasons = [];
let seasonId = 0;

onClick('add-season', () => {
    seasons.push(new Season(seasonId++, getValue('new-anime-season')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let seasonDiv = document.getElementById('anime-seasons');
    clearElement(seasonDiv);
    for (season of seasons) {
        let table = createSeasonTable(season);
        let title = document.createElement('h2');
        title.innerHTML = season.name;
        title.appendChild(createDeleteSeasonButton(season));
        seasonDiv.appendChild(title);
        seasonDiv.appendChild(table);
        for (anime of season.animes) {
            createAnimeRow(season, table, anime);
        }
    }
}

function createAnimeRow(season, table, anime) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = anime.title;
    row.insertCell(1).innerHTML = anime.studio;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteAnimeButton(season, anime));
}

function createDeleteAnimeButton(season, anime) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = season.animes.indexOf(anime);
        season.animes.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteSeasonButton(season) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Team';
    btn.onclick = () => {
        let index = seasons.indexOf(season);
        seasons.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewAnimeButton(season) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Add Member';
    btn.onclick = () => {
        season.animes.push(new Anime(getValue(`title-input-${season.id}`), getValue(`studio-input-${season.id}`)));
        drawDOM();
    };
    return btn;
}

function createSeasonTable(season) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let titleColumn = document.createElement('th');
    let studioColumn = document.createElement('th');
    titleColumn.innerHTML = 'Anime Title';
    studioColumn.innerHTML = 'Production Studio';
    row.appendChild(titleColumn);
    row.appendChild(studioColumn);
    let formRow = table.insertRow(1);
    let titleTh = document.createElement('th');
    let studioTh = document.createElement('th');
    let createTh = document.createElement('th');
    let titleInput = document.createElement('input');
    titleInput.setAttribute('id', `title-input-${season.id}`);
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('class', 'form-control');
    let studioInput = document.createElement('input');
    studioInput.setAttribute('id', `studio-input-${season.id}`);
    studioInput.setAttribute('type', 'text');
    studioInput.setAttribute('class', 'form-control');
    let newAnimeButton = createNewAnimeButton(season);
    titleTh.appendChild(titleInput);
    studioTh.appendChild(studioInput);
    createTh.appendChild(newAnimeButton);
    formRow.appendChild(titleTh);
    formRow.appendChild(studioTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}