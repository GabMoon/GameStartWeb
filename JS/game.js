let Game = [];
let Ratings = [];
let userReviewCount = 0;

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

    document.getElementById("SubmitReview").onclick= registerReview;
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

                    let star1 = document.createElement('span');
                    let star2 = document.createElement('span');
                    let star3 = document.createElement('span');
                    let star4 = document.createElement('span');
                    let star5 = document.createElement('span');
                    
                    //Adds Stars to all the Reviews for the game
                    let starList = [star1,star2,star3,star4,star5];
                    let currentScore = Ratings[i].score;
                    appendStars(reviewStars, currentScore, starList);

                    // if(Ratings[i].score == 1){
                    //     star1.setAttribute("class", "fa fa-star checked");
                    //     reviewStars.appendChild(star1);
                    // }
                    // if(Ratings[i].score == 2){
                    //     star1.setAttribute("class", "fa fa-star checked");
                    //     star2.setAttribute("class", "fa fa-star checked");
                    //     reviewStars.appendChild(star1);
                    //     reviewStars.appendChild(star2);
                    // }
                    // if(Ratings[i].score == 3){
                    //     star1.setAttribute("class", "fa fa-star checked");
                    //     star2.setAttribute("class", "fa fa-star checked");
                    //     star3.setAttribute("class", "fa fa-star checked");
                    //     reviewStars.appendChild(star1);
                    //     reviewStars.appendChild(star2);
                    //     reviewStars.appendChild(star3);
                    // }
                    // if(Ratings[i].score == 4){
                    //     star1.setAttribute("class", "fa fa-star checked");
                    //     star2.setAttribute("class", "fa fa-star checked");
                    //     star3.setAttribute("class", "fa fa-star checked");
                    //     star4.setAttribute("class", "fa fa-star checked");
                    //     reviewStars.appendChild(star1);
                    //     reviewStars.appendChild(star2);
                    //     reviewStars.appendChild(star3);
                    //     reviewStars.appendChild(star4);
                    // }
                    // if(Ratings[i].score == 5){
                    //     star1.setAttribute("class", "fa fa-star checked");
                    //     star2.setAttribute("class", "fa fa-star checked");
                    //     star3.setAttribute("class", "fa fa-star checked");
                    //     star4.setAttribute("class", "fa fa-star checked");
                    //     star5.setAttribute("class", "fa fa-star checked");
                    //     reviewStars.appendChild(star1);
                    //     reviewStars.appendChild(star2);
                    //     reviewStars.appendChild(star3);
                    //     reviewStars.appendChild(star4);
                    //     reviewStars.appendChild(star5);
                    // }
                    // reviewStars.appendChild(star);

                    reviewHeader.appendChild(reviewStars);
                    
                    let breakline = document.createElement('br');
                    let headusername = document.createElement('b');
                    headusername.innerText = Ratings[i].user.username;
                    reviewHeader.appendChild(breakline);
                    reviewHeader.appendChild(headusername);
                    reviewDiv.appendChild(reviewHeader);

                    //Review Comments 
                    let reviewBody = document.createElement('div');
                    reviewBody.setAttribute("class", "reviews-members-body");

                    let body = document.createElement("p");
                    body.innerHTML = Ratings[i].description;

                    reviewBody.appendChild(body);

                    reviewDiv.appendChild(reviewBody);
                    let revBox = document.getElementById("ReviewBox");
                    revBox.appendChild(reviewDiv);
                }

                //view the number of stars for all the reviews
                // let count = 0;
                //     for(let reviewstarts in Ratings){
                //         count++;
                //         console.log(String(count)+"   " +String(Ratings[reviewstarts].score));
                //     }

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

function countStars(count){
    userReviewCount =count;
}

function registerReview(){
    console.log(userReviewCount);

    let commentArea = document.getElementById("CommentArea").value;
    //let url = `http://localhost:5000/review/register/1/1/${userReviewCount}/${commentArea}`;
    let url = `http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/review/register/${Game.id}/${userReviewCount}/${commentArea}`
    fetch(url,{
        method: "POST"
       // headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

function appendStars(reviewStars, currentScore, starList){

    // star1.setAttribute("class", "fa fa-star checked");
    // reviewStars.appendChild(star1);

    for (let i = 0;i< currentScore;i++){
        starList[i].setAttribute("class", "fa fa-star checked");
    }

    for(let list in starList){
        reviewStars.appendChild(starList[list]);
    }
    return reviewStars;
}
