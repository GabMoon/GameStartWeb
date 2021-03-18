let Game = [];
let Ratings = [];
let numReviews = 0;

window.onload = () => {
    buildNavBar();
    let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games/name/' + location.search.substring(1);

    fetch(url)
        .then(response => response.json())
        .then(json => {
            Game = json;
            buildGameBox();
            buildRatings();
        })
        .catch(err => console.log(err));    
}

function buildNavBar(){
    document.getElementById("logoImage").onclick = redirectHome;  
    
    document.getElementById("searchButton").onclick = redirectGameSearch;

    document.getElementById("userProfile").onclick = redirectUser;
}

function buildGameBox(){
    let image = document.getElementById("image");
    let imageAddress = Game.background_image;
    image.setAttribute("src", imageAddress);

    let gameTitle = document.getElementById("title");
    let titleText = document.createTextNode(Game.name);
    gameTitle.appendChild(titleText);

    let description = document.getElementById("description");
    description.innerHTML = Game.description;
    
    // Genre list ol
    let listOfGenres = document.getElementById("genres");
    for (let g of Game.genre){
        let text = document.createTextNode(g.name);
        let ListItem = document.createElement('li');
        ListItem.appendChild(text);

        listOfGenres.appendChild(ListItem);
    }

    let listOfPlatforms = document.getElementById("platforms");
    for (let plat of Game.platforms){
        let text = document.createTextNode(plat.name);
        let ListItem = document.createElement('li');
        ListItem.appendChild(text);

        listOfPlatforms.appendChild(ListItem);
    }

    let listOfDevelopers = document.getElementById("developers");
    for (let d of Game.developers){
        let text = document.createTextNode(d.name);
        let ListItem = document.createElement('li');
        ListItem.appendChild(text);

        listOfDevelopers.appendChild(ListItem);
    }

    let listOfPublishers = document.getElementById("publishers");
    for (let pub of Game.publishers){
        let text = document.createTextNode(pub.name);
        let ListItem = document.createElement('li');
        ListItem.appendChild(text);

        listOfPublishers.appendChild(ListItem);
    }

    
}

function buildRatings(){
    // Fetch reviews
    let reviewUrl = `http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/review/game/${Game.id}`;
    fetch(reviewUrl)
            .then(response=> response.json())
            .then(json => {
                console.log(reviewUrl);
                console.log(numReviews);
                Ratings = json;
                console.log(Ratings);
                numReviews = 1;
                buildRatings();
            })
            .catch(err => {
                numReviews = 0;
                console.log(err);
            });

    //Count reviews
    let ratings = document.getElementById("numRating");
    let ratingsText
    if (numReviews == 0)
        ratingsText = document.createTextNode("(0)");
    else{
        ratingsText = document.createTextNode("(?)");
    }
    ratings.appendChild(ratingsText);

    // Star Rating
    let ratingScore = document.getElementById("rating");
    let text = `${Game.rating}` + "/5";
    let ratingScoreText = document.createTextNode(text);
    ratingScore.appendChild(ratingScoreText);

    for (let i = 1; i < 6; i++){
        let curElement = "star" + `${i}`;
        let star = document.getElementById(curElement);
        if (i <= Game.rating){
            star.setAttribute("class", "fas fa-star checked fa-2x");
        }else if (Game.rating > i){
            star.setAttribute("class", "fas fa-star-half-alt fa-2x");
        }else{
            star.setAttribute("class", "fas fa-star fa-2x");
        }
    } 
}

function redirectHome(){
    window.location.href = "home.html"; 
}

function redirectUser(){
    window.location.href = "game.html"; 
}

function redirectGameSearch(){
    let searchGame = document.getElementById("searchBox").value;
    let gamePage = "game.html?" + searchGame;
    window.location.href = gamePage;
}