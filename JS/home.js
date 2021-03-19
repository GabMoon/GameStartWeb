let topTen= [];

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
    buildTeamFavorite("Gabby's", 304);
    buildTeamFavorite("Danny's", 24);
}

function buildNavBar(){
    document.getElementById("logoImage").onclick = redirectHome;  
    
    document.getElementById("searchButton").onclick = redirectGameSearch;

    document.getElementById("searchBox").addEventListener("keydown", (e)=>{
        if(e.keyCode == 13){
            redirectGameSearch();
        }        
    });

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
        // console.log(topTen[i - 1].background_image);
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

function buildTeamFavorite(name, gameId){
    let url = `http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games/id/${gameId}`;
    
    let favGame;
    fetch(url)
           .then(response => response.json())
            .then(json => {
                favGame = json;
                console.log(favGame.name);
            })
            .then(()=>{
                
                console.log(favGame.name);

                let section = document.createElement('section');
                section.setAttribute("class", "border col-md-12 search-result-item shadow-sm flex-md-row mb-1");
                section.setAttribute("name", favGame.name);
                section.setAttribute("id", favGame.name);

                let a = document.createElement('a');
                a.setAttribute("class", "image-link");
                // a.setAttribute("href", `game.html/name${favGame.name}`);

                    let image = document.createElement("img");
                    image.setAttribute("class", "image");
                    image.setAttribute("src", favGame.background_image);
                    console.log(favGame.background_image);
                    a.appendChild(image);
                
                section.appendChild(a);

                let textBox = document.createElement('div');
                textBox.setAttribute("class", "search-result-item-body ");
                    let rowBox = document.createElement('div');
                    rowBox.setAttribute("class", "row");
                        let colBox = document.createElement('div');
                        colBox.setAttribute("class", "col-sm-9");
                            let Tstrong = document.createElement("strong");
                            Tstrong.setAttribute("class", "mb-0 text-primary");
                            Tstrong.innerHTML = name + ":";
                            colBox.appendChild(Tstrong);

                            let heading = document.createElement("h5");
                            heading.setAttribute("class", "search-result-item-heading");
                                let a2 = document.createElement('a');
                                a2.setAttribute("href", "#");
                                a2.innerHTML = favGame.name;
                                // a2.setAttribute("href", `game.html/name${favGame.name}`);
                            heading.appendChild(a2);
                            let p = document.createElement('p');
                            p.setAttribute("class", "description m-md-0");
                            p.innerHTML = favGame.description.substring(0, 300) + "...";
                        colBox.appendChild(heading);
                        colBox.appendChild(p);
                            // colBox.innerHTML = favGame.platforms[0];
                    rowBox.appendChild(colBox);
                textBox.appendChild(rowBox);

                section.appendChild(textBox);
                section.onclick = redirectGame;

                let Box = document.getElementById("favGamesBox");
                Box.appendChild(section);
            })
            .catch(err => console.log(err));
}


function redirectHome(){
    window.location.href = "home.html"; 
}

function redirectGameSearch(){
    let searchGame = document.getElementById("searchBox").value;
    let gamePage = "search.html?" + searchGame;
    window.location.href = gamePage;
}

function redirectUser(){
    window.location.href = "user.html"; 
}

function redirectGame(){
    let gameName = this.id;
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