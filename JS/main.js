let allGames = [];

window.onload = () => {
    //let promise = fetch('https://localhost:5000/games')
    
    let promise = fetch('http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games')
           .then(response => response.json())
           .then(buildGamesBox())
            .then(json => {
                allGames = json;
                buildGames();
            })
            .catch(err => console.log(err));
}

function buildGamesBox(){
    console.log("In build Games Box ");
    let allGamesList = document.createElement('ol');
    allGamesList.setAttribute("class", "gs-searchResult");
    allGamesList.setAttribute("id", "games-list")
    let resultsDiv = document.getElementById("div-search-box");
    resultsDiv.appendChild(allGamesList); 
}

function buildGames(){   
    console.log("In build Games");
    let allGamesList = document.getElementById("games-list");

   //Append Name for loop
   let NameItem, NameText
   for (const cur in allGames){
        //Individual Game
        console.log("In Game for loop");
        NameItem = document.createElement('li');
        NameText = document.createTextNode(allGames[cur].name);
        NameItem.appendChild(NameText);
        NameItem.setAttribute("class", "gs-searchResultItem");
        NameItem.setAttribute("id", allGames[cur].id);
        NameItem.onclick = redirect;
    // append to allGamesList;
    allGamesList.appendChild(NameItem);
   }

}

function redirect(){
    console.log("in redirect");
    console.log(this.id);
    alert('redirect called on ' + this.innerHTML + " " + this.id);
    let gameId = this.id;
    let gamePage = "game.html?" + gameId;
    window.location.href = gamePage;
}