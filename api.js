"use strict"
const defaultIMGURL = "https://img.icons8.com/ios-filled/2x/no-image.png";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $episodesList = $("#episodesList");
const $searchForm = $("#searchForm");
const $input = $("#searchForm-term");

//Event to listen for clicks on the form.
//Clears the search example. 
$input.on("click", function() {
    this.value = '';
})



//Event to listen for a click on the submit btn. 
//Function to call when the btn submit is clicked. 
$searchForm.on("submit", function(e) {
    e.preventDefault();
    async function display() {
        const term = $("input").val();
        const newObj = await getShowsByTerm(term);
        populateShows(newObj);
    }
    display();
    $episodesArea.hide();
})

//Event to listen for clicks on episodes.
$showsList.on("click", ".Show-getEpisodes", function(e) {
    async function display() {
        const targetId = $(e.target).closest(".Show").data("show-id");
        const results = await getEpisodes(targetId);
        populateEpisodes(results);
    }
    display();
})


//This function will search through the API for the parameter thats been passed. 
//Creates an iterable array. 
async function getShowsByTerm(term) {
    const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
    return response.data.map(result => {
        const show = result.show;
        return {
            id: show.id,
            name: show.name,
            summary: show.summary,
            image: show.image ? show.image.medium : defaultIMGURL,
        }
    });
}

//This code will clear any prior searches upon execution. 
//This function will loop through the newObj and create it's own template for html. 
function populateShows(shows) {
    $showsList.empty(); 

    for(let show of shows) {
        const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
            <div class="media">
            <img
                src="${show.image}"
                alt="${show.name}" class="w-25 me-3">
            <div class="media-body">
                <h5 class="text-primary">${show.name}</h5>
                <div><small>${show.summary}</small></div>
                <button class="btn btn-outline-light btn-sm Show-getEpisodes">Episodes</button>
           </div>
         </div>
        </div>`
        );
        $showsList.append($show);
    }
}



async function getEpisodes(targetID) {
    const response = await axios.get(`http://api.tvmaze.com/shows/${targetID}/episodes`);
    
    return response.data.map(e => ({
        id: e.id,
        name: e.name,
        season: e.season,
        number: e.number, 
    }))
}

function populateEpisodes(episodes) {
    $episodesList.empty();
    for(let episode of episodes) {
        const $item = $(
        `<li>${episode.name}(season ${episode.season}, episode ${episode.number})</li>`
        )
        $episodesList.append($item);
    }
    $episodesArea.show();
}

