window.onload = () => {
    document.getElementById("formButton").addEventListener('click', verifyForm);
    document.getElementById("formButtonNewAccount").addEventListener('click', registerNewAccount);
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
        let url = 'http://localhost:5000/users/authentication';

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
        console.log(sessionStorage);
        window.location.href = "home.html";
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