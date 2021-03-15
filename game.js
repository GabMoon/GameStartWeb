let Game = [];

window.onload = () => {
    console.log(location.search.substring(1));
    let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games/id/' + location.search.substring(1);

    let promise = fetch(url)
           .then(response => response.json())
            .then(json => {
                Game = json;
                buildGameBox();
            })
            .catch(err => console.log(err));
}

function buildGameBox(){
    //Header
    let gameTitle = document.getElementById("gameName");
    let titleText = document.createTextNode(Game.name);
    gameTitle.appendChild(titleText);

    let rating = document.getElementById("gameRating");
    let text = "Rating:  " + Game.rating;
    console.log(text);
    let ratingText = document.createTextNode(text);
    rating.appendChild(ratingText);
    
    let genre = document.getElementById("gameGenre");
    text = "Genre:  " + Game.genre;
    let genreText = document.createTextNode(Game.genre[0]);
    if (Game.genre[0] != null)
        genre.appendChild(genreText);

    let description = document.getElementById("gameDescParagraph");
    let descText = document.createTextNode(Game.description);
    if (Game.description != null)
        description.appendChild(descText);

    let developers = document.getElementById("gameDevelopers");
    let devsText = document.createTextNode(Game.developers[0]);
    if (devsText != null)
        developers.appendChild(devsText);
    
    let publishers = document.getElementById("gamePublishers");
    let pubsText = document.createTextNode(Game.publishers[0]);
    if (pubsText != null)
        publishers.appendChild(pubsText);

    let platforms = document.getElementById("gamePlatforms");
    let platsText = document.createTextNode(Game.platforms[0]);
    if (platsText != null)
        platforms.appendChild(platsText);
}