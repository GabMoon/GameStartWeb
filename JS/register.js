window.onload = () => {

    if (sessionStorage.getItem("id") != null) {
        window.location.href = "home.html";
    }

    document.getElementById("formButton").addEventListener('click', verifyForm);
    document.getElementById("goBackToLogin").addEventListener('click', goToLoginPage);
}

function goToLoginPage() {
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
        let url = 'http://localhost:5000/users/register';

        register(url, userRegister).then(data=> {
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
                console.log(sessionStorage);
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