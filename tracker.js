//Creating a class for anime with title and studio attributes
class Anime {
    constructor(title, studio) {
        this.title = title;
        this.studio = studio;
    }
}

//Class for Seasons with attributes for id, name, and an array for anime
class Season {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.animes = [];
    }

    // Method allows adding anime to animes array in seasons
    addMember(anime) {
        this.animes.push(anime);
    }

    // Method allows deleting anime from animes array in seasons
    deleteMember(anime) {
        let index = this.animes.indexOf(anime);
        this.animes.splice(index, 1);
    }
}

//Array for adding new seasons into
let seasons = [];
//Setting initial season ID to 0
let seasonId = 0;

//Uses the onClick function to add the click event listener to the add-season button and lets that
//button create new seasons. Then uses the drawDOM fuction to redraw our Seasons table. When creating
//the new season, it will assign a season ID and grab the season name from the new-anime-season input
onClick('add-season', () => {
    seasons.push(new Season(seasonId++, getValue('new-anime-season')));
    drawDOM();
});

//Functions allows easily adding the click event listener to elements
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

//Function pulls the value from an element after locating the element by ID
function getValue(id) {
    return document.getElementById(id).value;
}

//Function clears out our anime-seasons div which houses our table. On redraw it will cycle
//through the seasons array and create a titled table for each season with a delete season button
//and inputs (form and button) for adding a new Anime to each season
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

//Function creates rows for each anime and inserts the anime's title, studio, and a delete button
function createAnimeRow(season, table, anime) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = anime.title;
    row.insertCell(1).innerHTML = anime.studio;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteAnimeButton(season, anime));
}

//Creates a button that will remove that row's anime by splicing it from that seasons animes array
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

//Function creates a button that will delete a season from the season's array
function createDeleteSeasonButton(season) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Season';
    btn.onclick = () => {
        let index = seasons.indexOf(season);
        seasons.splice(index, 1);
        drawDOM();
    };
    return btn;
}

//Function creates a button that uses the title and studio inputs and creates a new Anime object
//to push the the seasons's animes array
function createNewAnimeButton(season) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Add Anime';
    btn.onclick = () => {
        season.animes.push(new Anime(getValue(`title-input-${season.id}`), getValue(`studio-input-${season.id}`)));
        drawDOM();
    };
    return btn;
}

//Function allows the drawDOM function to draw the actual table. Establishes the attributes for the table,
//creates the elements that make up the table, inserts them, and returns them to the drawDOM function to be
//added to the seasonDiv
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

//Allows the drawDOM function to clear the current table. Will proceed to remove elements
//until there is no longer a firstChild
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}