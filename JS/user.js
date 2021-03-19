

window.onload = () => {
      buildNavBar();
      buildUser();
      showFavorites();
      addEventOnClick();
      
}

function buildNavBar(){
    document.getElementById("logoImage").onclick = redirectHome;  
    
    document.getElementById("searchButton").onclick = redirectGameSearch;

    document.getElementById("userProfile").onclick = redirectUser;

    document.getElementById("searchBox").addEventListener("keydown", (e)=>{
        if(e.keyCode == 13){
            redirectGameSearch();
        }        
    });

    if (sessionStorage.getItem("id") == null) {
        document.getElementById("changeToLoginPage").onclick = goToLoginPage;
    }
    else {
        document.getElementById("changeToLoginPage").id = "Logout";
        document.getElementById("Logout").textContent = "Logout";
        document.getElementById("Logout").onclick = logout;

    }
}

function redirectHome(){
    window.location.href = "home.html"; 
}

function redirectUser(){
    window.location.href = "user.html"; 
}

function redirectGameSearch(){
    let searchGame = document.getElementById("searchBox").value;
    let gamePage = "search.html?" + searchGame;
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


function buildUser(){

    let username = document.getElementById('username');
    let fullname = document.getElementById('fullname');
    let email = document.getElementById('email');

    username.innerText = sessionStorage.getItem("username");
    fullname.innerText = capFirstLetter(String(sessionStorage.getItem("firstname"))) +"   "+ capFirstLetter(String(sessionStorage.getItem("lastname")));
    email.innerText = sessionStorage.getItem("email");
}
function showFavorites(){

    
    let userid = sessionStorage.getItem("id");
    // let cardid = document.getElementById();
   // let reviewUrl = `http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/users/myFavorites/`;
    let favoriteUrl = `http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/users/myFavorite`;
    fetch(favoriteUrl)
            .then(response=> response.json())
            .then(json => {
                console.log(favoriteUrl);
                Favorites = json;
            })
            .then(()=> {
                

                // for(let i = 0; i < Favorites.length; i++){
                //     let favoritediv = document.createElement('div');
                    
                //         console.log(String(1));
                // }
                // Fetch reviews
                    let count = 1;
                    
                    let TheGameButton = document.getElementById('TheGame');
                    let cardContainer = document.getElementById('cardContainer');
                    for (let i = 0; i<Favorites[0].user.gameFavorites.length;i++){
                        
                        
                        let cardsdivouter = document.createElement('div');
                         //cardsdivouter.setAttribute("name",Favorites[0].user.gameFavorites[i].name);
                        //cardsdivouter.onclick = redirectGame.bind(Favorites[0].user.gameFavorites[i].name);
                         //cardsdivouter.setAttribute("name",Favorites[0].user.gameFavorites[i].name);
                        //console.log(String(Favorites[0].user.gameFavorites[i].name));
                        cardsdivouter.setAttribute("class","card feature-card");
                        cardsdivouter.setAttribute("style","width: 40rem;");
                        // let id = "cardid" + String(count);
                        // cardsdivouter.setAttribute("id", id); 
                        
                       
                        //console.log();
                       
                        
                        
                        let image = document.createElement('div');
                        image.innerHTML += '<img src="'+Favorites[0].user.gameFavorites[i].background_image +'" class = "d-block w-100"/>';
                        // image.style.height = '10em';
                        // image.style.width = '20em';
                        image.setAttribute("style","height: 3rem");
                        // image.addEventListener('click',redirectGame(Favorites[0].user.gameFavorites[i].name));

                        let cardsdivinter = document.createElement('div');
                        cardsdivinter.setAttribute("class","card-body");
                        
                        //title of game
                        let cardh5 = document.createElement('h5');
                        cardh5.innerHTML = Favorites[0].user.gameFavorites[i].name;
                        cardh5.setAttribute("class","image-caption2 text-white text-center");

                        
                        cardsdivinter.appendChild(cardh5);
                         cardsdivouter.appendChild(image);
                        cardsdivouter.appendChild(cardsdivinter);
                        cardContainer.appendChild(cardsdivouter);


                        

                        // console.log(String(Favorites[i].user.gameFavorites[j].name));
                        //cardsdivouter.onclick = redirectGame(Favorites[0].user.gameFavorites[i].name);
                        //redirectGameFunction(TheGameButton,Favorites[0].user.gameFavorites[i].name);
                        //TheGameButton.addEventListener('click',redirectGame(Favorites[0].user.gameFavorites[i].name));
                        //cardsdivouter.onclick = redirectGame;
                        // listdivid.push(listdivid.slice(id));
                        // count++;

                        //cardsdivouter.onclick = redirectGame.bind(Favorites[0].user.gameFavorites[i].name);
                    }
                    
               
                    
            });
            
}

function addEventOnClick(){
    //console.log(listdivid.length);
    // for(let i = 0; i < listdivid.length; i++){
    //     let divid = getElementById(listdivid[i]);
    //     console.log(listdivid[i]);
    //     divid.addEventListener('click', redirectGame);
    //     console.log(listdivid[i]);
    // }
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// function redirectGameFunction(TheGameButton,name){
//     TheGameButton.onclick = redirectGame(name);
// }

function redirectGame(name){
    // alert(name);
    let gameName = name;
    let gamePage = "game.html?" + gameName;
    window.location.href = gamePage;
    
}

// function redirectGameSearch(){
//     let searchGame = document.getElementById("searchBox").value;
//     let gamePage = "search.html?" + searchGame;
//     window.location.href = gamePage;
// }

let listdivid= [];