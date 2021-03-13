let Game = [];

window.onload = () => {
    //let promise = fetch('https://localhost:5000/games')
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
    let gameTitle = document.getElementById("gameName");
    console.log(Game.name)
    let titleText = document.createTextNode(Game.name);
    gameTitle.appendChild(titleText);
}