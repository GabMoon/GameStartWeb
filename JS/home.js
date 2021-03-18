let topTen= [];

let DannysGame = {
    "id":928,
    "name":"Super Smash Bros. Ultimate",
    "description":"<p>Super Smash Bros. Ultimate is the fifth game in its franchise. It is also the first game in its series to be released for Nintendo Switch.</p>\n<h3>Premise</h3>\n<p>The series is a crossover of characters from various video game franchises, such as The Legend of Zelda, Pokemon, Sonic the Hedgehog, Super Mario, Metroid, and Mega Man, among many others. Their famous protagonists fight each other on an arena. In accordance with its name, the game is the “ultimate” installment of the series, in that it offers the players all the characters ever featured in Super Smash Bros. The game also introduces five new characters, most famously, Castlevania&#39;s Simon Belmont.</p>\n<h3>Gameplay</h3>\n<p>Unlike most fighting games, Super Smash Bros. series is built around knocking opponents out of the arena rather than lowering their health bars. However, the damage meter increases the character&#39;s chances to be knocked out. Each fighter has a limited number of lives and loses one when he or she is knocked out. The player is eliminated when he or she loses all lives.</p>\n<h3>Multiplayer</h3>\n<p>Super Smash Bros. Ultimate includes several competitive multiplayer modes. Besides the traditional versus mode, there are several new modes not featured in the previous games. These include Tournament (the playoff mode for 32 players), Smash Squad (team multiplayer), Smashdown (a mode in which the defeated characters are eliminated).</p>",
    "rating":4,
    "developers":["Nintendo", "Bandai Namco Entertainment",  "Sora"],
    "publishers":["Nintendo"],
    "platforms":["Nintendo Switch"],
    "genre":["Fighting"]
};
let ElisGame = {
    "id":2024,
    "name":"Dota 2",
    "description":"<p>What used to be an unofficial modded map for the Warcraft 3, ended up being the most budgeted cybersport discipline, gathering millions of people to watch annual international championships.<br />\nMOBA genre started with the DOTA, Defense of the Ancients, which can be efficiently described as 5 vs 5 top-down action strategy game, during which players are tasked to destroy the enemy core while protecting their own.<br />\nPlayers can pick out of the roster of 112 heroes and battle on the single map while taking advantage of field vision, resources and item build that can either make heroes stronger or disable the enemy. DOTA 2 is still active, and receives updates weekly, reshaping metas and refreshing game balance, if by any chance some heroes became unreasonably strong. Each hero has not only a unique set of abilities but is fully customizable, through getting items for heroes after matches of through the trade. Not only heroes but terrain, couriers, that deliver items for you and even match announcers, that can be voiced by heroes, professional casters of just memorable characters from other forms of media.</p>",
    "rating":3,
    "developers":["Valve Software"],
    "publishers":["Valve"],
    "platforms":["PC", "Apple Macintosh", "Linux"],
    "genre":["Action", "Massively Multiplayer"]
};

window.onload = () => {
    let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games/top10';

    let promise = fetch(url)
           .then(response => response.json())
            .then(json => {
                topTen = json;
                buildTopTen();
            })
            .catch(err => console.log(err));
    
    buildNavBar();
    buildDannysGame();
    buildElisGame();
}

function buildNavBar(){
    document.getElementById("logoImage").onclick = redirectHome;  
    
    document.getElementById("searchButton").onclick = redirectGameSearch;

    document.getElementById("searchBox").addEventListener("keydown", (e)=>{
        if(e.keyCode == 13){
            redirectGameSearch();
        }        
    })

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

function buildTopTen(){
    for (let i = 1; i < 6; i++){
        let curElement = "image" + `${i}`;

        let image = document.getElementById(curElement);
        let imageAddress = topTen[i - 1].background_image;
        console.log(topTen[i - 1].background_image);
        image.setAttribute("src", imageAddress);

        curElement = "title" + `${i}`;
        let title = document.getElementById(curElement);
        let titleText = document.createTextNode(topTen[i - 1].name);
        title.appendChild(titleText);

        curElement = "button" + `${i}`;
        let button = document.getElementById(curElement);
        button.setAttribute("name", topTen[i - 1].name);
        button.onclick = redirectGame;
    }
}

function buildDannysGame(){
    //Header
    let name = document.getElementById("teamMember1");
    let nameText = document.createTextNode("Danny's:");
    name.appendChild(nameText);

    let game = document.getElementById("game1");
    let gameText = document.createTextNode(DannysGame.name);
    game.appendChild(gameText);
    
    let platforms = document.getElementById("platform1");
    let platsText = document.createTextNode(DannysGame.platforms[0]);
    if (platsText != null)
        platforms.appendChild(platsText);

    // let description = document.getElementById("description1");
    // let trimmedDesc = DannysGame.description.substring(0, 100) + " ...";
    // description.innerHTML = trimmedDesc;
}

function buildElisGame(){
    //Header
    let name = document.getElementById("teamMember2");
    let nameText = document.createTextNode("Eli's:");
    name.appendChild(nameText);

    let game = document.getElementById("game2");
    let gameText = document.createTextNode(ElisGame.name);
    game.appendChild(gameText);
    
    let platforms = document.getElementById("platform2");
    let platsText = document.createTextNode(ElisGame.platforms[0]);
    if (platsText != null)
        platforms.appendChild(platsText);

    // let description = document.getElementById("description2");
    // let trimmedDesc = ElisGame.description.substring(0, 100) + " ...";
    // description.innerHTML = trimmedDesc;
}

function redirectHome(){
    window.location.href = "home.html"; 
}

function redirectGameSearch(){
    let searchGame = document.getElementById("searchBox").value;
    let gamePage = "game.html?" + searchGame;
    window.location.href = gamePage;
}

function redirectUser(){
    window.location.href = "user.html"; 
}

function redirectGame(){
    let gameName = this.name;
    let gamePage = "game.html?" + gameName;
    window.location.href = gamePage;
}

function goToLoginPage() {
    window.location.href = "login.html";
}

function logout() {
    let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/users/logout'

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
        document.getElementById("Logout").id = "changeToLoginPage";
        document.getElementById("changeToLoginPage").textContent = "Login";
        document.getElementById("changeToLoginPage").onclick = goToLoginPage;
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