window.onload = () => {
    buildNavBar();
    if (sessionStorage.getItem("id") != null) {
        window.location.href = "home.html";
    }

    document.getElementById("formButton").addEventListener('click', verifyForm);
    document.getElementById("formButtonNewAccount").addEventListener('click', registerNewAccount);
}

function buildNavBar(){
    document.getElementById("logoImage").onclick = redirectHome;  
    
    document.getElementById("searchButton").onclick = redirectGameSearch;

    document.getElementById("searchBox").addEventListener("keydown", (e)=>{
        if(e.keyCode == 13){
            redirectGameSearch();
        }        
    });

    // if (sessionStorage.getItem("id") == null) {
    //     document.getElementById("changeToLoginPage").onclick = goToLoginPage;
    // }
    // else {
    //     alert("in button.set");
    //     document.getElementById("changeToLoginPage").id = "Logout";
    //     document.getElementById("Logout").textContent = "Logout";
    //     document.getElementById("Logout").onclick = logout;

    // }
}

function registerNewAccount() {
    window.location.href = "register.html";
}

function verifyForm(){
    let username = document.getElementById("Username");
    let password = document.getElementById("Password");

    if (username.value.trim() === "" || password.value.trim() === ""){
       
    }
    else {
        submitForm(username, password);
    }
}

function submitForm(username, password) {
        let userLogin = {username : username.value, password : password.value};
        //let url = 'http://localhost:5000/users/authentication';
        let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/users/authentication';

        authentication(url, userLogin).then(data=> {
            responseFunction(data);
        });
}

function responseFunction(userData) {
    let failedLogin = document.getElementById("failedLogin");
    console.log("The user data is " + userData);
    if (userData == undefined || userData == null) {

        if (failedLogin.style.display == "none") {
            failedLogin.style.display = "inline-block";
        }   
    }
    else {
        if (failedLogin.style.display == "inline-block") {
            failedLogin.style.display = "none";
        }


        sessionStorage.setItem("id", userData.id);
        sessionStorage.setItem("username", userData.username);
        sessionStorage.setItem("role", userData.role);
        sessionStorage.setItem("firstname", userData.firstname);
        sessionStorage.setItem("lastname", userData.lastname);
        sessionStorage.setItem("email", userData.email); 

        window.location.href = "home.html";
    }
}

async function authentication(url, userData) {

    if (sessionStorage.getItem("id") != null) {
        window.location.href = "home.html";
    }
    try {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE
            //   mode: 'cors',
            //   cache: 'default',
            //   credentials: 'same-origin',
            headers: {
                'Content-Type' : 'application/json'
            },
            //   redirect: 'follow',
            //   referrerPolicy: 'no-referrer-when-downgrade',
            body: JSON.stringify(userData)        
        });

        return await response.json();
    }catch(e) {
        
    }
    
}

function showPassword() {
    let x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
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
