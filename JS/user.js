let Favorites = [];

window.onload = () => {
      buildNavBar();
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
    let gamePage = "game.html?" + searchGame;
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