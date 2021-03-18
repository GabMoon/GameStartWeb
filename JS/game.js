let Game = [];
let Ratings = [];

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

    if (sessionStorage.getItem("id") == null) {
        document.getElementById("changeToLoginPage").onclick = goToLoginPage;
    }
    else {
        document.getElementById("changeToLoginPage").id = "Logout";
        document.getElementById("Logout").textContent = "Logout";
        document.getElementById("Logout").onclick = logout;

    }
    
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
function fetchRatings(){
    
}
function buildRatings(){
    // Fetch reviews
    let reviewUrl = `http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/review/game/${Game.id}`;
    fetch(reviewUrl)
            .then(response=> response.json())
            .then(json => {
                console.log(reviewUrl);
                Ratings = json;
                numReviews = 1;
            })
            .then(() => {
                console.log(Ratings.length);
                let ratings = document.getElementById("numRating");
                if (Ratings.length == 0)
                    ratingsText = document.createTextNode("(0)");
                else{
                    ratingsText = document.createTextNode(`(${Ratings.length})`);
                }
                ratings.appendChild(ratingsText);
            })
            .then( ()=> {
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
            })
            .then(()=>{
                let box = document.getElementById("ReviewBox");
                for (let i = 0; i < Ratings.length; i++){
                    //Add reviews
                    let reviewDiv = document.createElement('div');
                    reviewDiv.setAttribute("class", "reviews-members pt-4 pb-4 media media-body");
                    
                    let reviewHeader = document.createElement('div');
                    reviewHeader.setAttribute("class", "reviews-members-header");

                    let reviewStars = document.createElement('span');
                    reviewStars.setAttribute("class", "star-rating float-right");
                    for (let j = 1; j < 6; j++){
                        let star = document.createElement('a');
                        star.setAttribute("href", "#");

                        let starI = document.createElement("i");

                        if (i <= Ratings[i].rating){
                            starI.setAttribute("class", "fas fa-star checked fa-2x");
                        }else if (Game.rating > i){
                            starI.setAttribute("class", "fas fa-star-half-alt fa-2x");
                        }else{
                            starI.setAttribute("class", "fas fa-star fa-2x");
                        }

                        star.appendChild(starI);
                        reviewStars.appendChild(star);
                    } 

                    reviewHeader.appendChild(reviewStars);
                    reviewDiv.appendChild(reviewHeader);

                    let reviewBody = document.createElement('div');
                    reviewBody.setAttribute("class", "reviews-members-body");

                    let body = document.createElement("p");
                    body.innerHTML = Ratings[i].description;

                    reviewBody.appendChild(body);

                    reviewDiv.appendChild(reviewBody);
                    let revBox = document.getElementById("ReviewBox");
                    revBox.appendChild(reviewDiv);
                }

            })
            .catch(err => {
                numReviews = 0;
                console.log(err);
            });    
}

function redirectHome(){
    window.location.href = "home.html"; 
}

function redirectUser(){
    window.location.href = "user.html"; 
}

function redirectGameSearch(){
    let searchGame = document.getElementById("searchBox").value;
    let gamePage = "game.html?" + searchGame;
    window.location.href = gamePage;
}

function goToLoginPage() {
    window.location.href = "login.html";
}

function logout() {
    let url = 'http://localhost:5000/users/logout'

    logOutAsync(url).then(data=> {
        responseFunction(data);
    });
}

function responseFunction(data) {
    if (data.status != 204) {
        alert("Could not log out");
    }
    else {
        sessionStorage.clear();
        window.location.href = "home.html";

    }
}

async function logOutAsync(url) {

    try {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE
            //   mode: 'cors',
            //   cache: 'default',
            //   credentials: 'same-origin',
            // headers: {
            //     'Content-Type' : 'application/json'
            // },
            //   redirect: 'follow',
            //   referrerPolicy: 'no-referrer-when-downgrade',
            //body: JSON.stringify(userData)        
        });

        return await response;
    }catch(e) {
        
    }
}