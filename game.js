let Game = [];

window.onload = () => {
    //let promise = fetch('https://localhost:5000/games')
    let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games/id/' + location.search.substring(1);

    let promise = fetch(url)
           .then(response => response.json())
           .then(buildGameBox())
            .then(json => {
                allGames = json;
                buildGames();
            })
            .catch(err => console.log(err));
}

function buildGameBox(){
    
}