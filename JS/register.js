window.onload = () => {

    
    if (sessionStorage.getItem("id") != null) {
        window.location.href = "home.html";
    }
    document.getElementById("formButton").addEventListener('click', verifyForm);
    document.getElementById("goBackToLoginAnything").addEventListener('click', goToLoginPage);
    buildNavBar();


}

function buildNavBar(){
    document.getElementById("logoImage").onclick = redirectHome;  
    
    document.getElementById("searchButton").onclick = redirectGameSearch;

    document.getElementById("searchBox").addEventListener("keydown", (e)=>{
        if(e.keyCode == 13){
            redirectGameSearch();
        }        
    });
}

function goToLoginPage() {
    console.log("I am in login");
    window.location.href = "login.html";
}

function verifyForm(){
    let firstname = document.getElementById("Firstname");
    let lastname = document.getElementById("Lastname");
    let username = document.getElementById("Username");
    let password = document.getElementById("Password");
    let passwordAgain = document.getElementById("PasswordAgain");
    let email = document.getElementById("Email");
    let validForm = true;

    if (firstname.value.trim() === "") {
        validForm = false;
        let blankFirstName = document.getElementById("blankFirstName");

        if (blankFirstName.style.display == "none") {
            blankFirstName.style.display = "inline-block";
        }  
    }
    else {

        let blankFirstName = document.getElementById("blankFirstName");

        if (blankFirstName.style.display == "inline-block") {
            blankFirstName.style.display = "none";
        } 

    }
    if (lastname.value.trim() === "") {
        validForm = false;
        let blankLastName = document.getElementById("blankLastName");

        if (blankLastName.style.display == "none") {
            blankLastName.style.display = "inline-block";
        }  
    }
    else {

        let blankLastName = document.getElementById("blankLastName");

        if (blankLastName.style.display == "inline-block") {
            blankLastName.style.display = "none";
        } 

    }
    if (username.value.trim() === "") {
        validForm = false;
        let blankUsername = document.getElementById("blankUsername");

        if (blankUsername.style.display == "none") {
            blankUsername.style.display = "inline-block";
        }  
    }
    else {

        let blankUsername = document.getElementById("blankUsername");

        if (blankUsername.style.display == "inline-block") {
            blankUsername.style.display = "none";
        } 

    }
    if (password.value.trim() === "") {
        validForm = false;
        let blankPassword = document.getElementById("blankPassword");

        if (blankPassword.style.display == "none") {
            blankPassword.style.display = "inline-block";
        }  
    }
    else {

        let blankPassword = document.getElementById("blankPassword");

        if (blankPassword.style.display == "inline-block") {
            blankPassword.style.display = "none";
        } 

    }
    if (passwordAgain.value.trim() === "") {
        validForm = false;
        let blankPasswordAgain = document.getElementById("blankPasswordAgain");

        if (blankPasswordAgain.style.display == "none") {
            blankPasswordAgain.style.display = "inline-block";
        }  
    }
    else {

        let blankPasswordAgain = document.getElementById("blankPasswordAgain");

        if (blankPasswordAgain.style.display == "inline-block") {
            blankPasswordAgain.style.display = "none";
        } 

    }
    if (password.value != passwordAgain.value) {
        validForm = false;
        let notMatchingPasswords = document.getElementById("NotMatchingPasswords");

        if (notMatchingPasswords.style.display == "none") {
            notMatchingPasswords.style.display = "inline-block";
        }  

    }
    else {

        let notMatchingPasswords = document.getElementById("NotMatchingPasswords");

        if (notMatchingPasswords.style.display == "inline-block") {
            notMatchingPasswords.style.display = "none";
        } 

    }
    if (email.value.trim() === "") {
        validForm = false;
        let blankEmail = document.getElementById("blankEmail");

        if (blankEmail.style.display == "none") {
            blankEmail.style.display = "inline-block";
        }  
    }
    else {

        let blankEmail = document.getElementById("blankEmail");

        if (blankEmail.style.display == "inline-block") {
            blankEmail.style.display = "none";
        } 

    }

    if (validForm) {
        submitForm(firstname, lastname, username, password, email);
    }
}

function submitForm(firstname, lastname, username, password, email) {
        let userRegister = {firstName: firstname.value, lastName: lastname.value, username : username.value, password : password.value, email: email.value, role: 'Basic'};
        console.log("I am here!!!");
        console.log("The regsiter is " + userRegister);
       // let url = 'http://localhost:5000/users/register'
        let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/users/register';

        register(url, userRegister).then(data=> {
            console.log(data.response);
            responseFunction(data, username, password);
        });
}

function responseFunction(responseData, username, password) {
    let failedRegister = document.getElementById("failedRegister");

    if (responseData.status != 201) {
        failedRegister.style.display = "inline-block";
    }
    else {
        let failedLogin = document.getElementById("failedLogin");
        failedLogin.style.display = "none";
        let userLogin = {username : username.value, password : password.value};
        let url = 'http://localhost:5000/users/authentication';
        //let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/users/authentication';
        authentication(url, userLogin).then(userData=> {
            if (userData == undefined || userData == null) {

                if (failedLogin.style.display = "none") {
                    failedLogin.style.display = "inline-block";
                }   
            }
            else {
                if (failedLogin.style.display = "inline-block") {
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
        });

    }
}

async function register(url, userData) {
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

        return await response;
    }catch(e) {
        
    }
}

async function authentication(url, userData) {
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